#!/usr/bin/env node

import argsParser from 'args-parser';
import fs from 'fs';
import { execSync } from 'child_process';

const colours = {
  blue: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  purple: "\x1b[34m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
  white: "\x1b[37m",
  yellow: "\x1b[33m",
};

const log = {
  blue: (str: string) => console.log(colours.blue, str),
  green: (str: string) => console.log(colours.green, str),
  red: (str: string) => console.log(colours.red, str),
  multiColour: (segments: string[][]) => {
    const output = segments
      .map((segment) => {
        const [text, colour] = segment;
        return `${colour}${text}`;
      })
      .join("");
    console.log(output + colours.reset);
  }
};

const currentVersion = __VERSION__; // injected by esbuild at build time

(async () => {
  try {
    const args = argsParser(process.argv);
    const isDryRun = args && args.dryRun

    if (args.help || args.h) {
      const newline = ['\n', colours.white]
      log.multiColour([
        ['@iamtomhewitt/releaser version ', colours.purple],
        [currentVersion, colours.blue],
        newline,
        newline,
        ['Creates and writes a new version of your project using your commits based on "@commitlint/config-conventional"', colours.blue],
        newline,
        ['updates your CHANGELOG.md, creates a tag, and pushes it all to your remote.', colours.blue],
        newline,
        newline,
        ['  - "feat" commits, or more than 25 changed files since the last tag, bumps major', colours.yellow],
        newline,
        ['  - "chore" commits bumps minor', colours.yellow],
        newline,
        ['  - everything else commits bumps patch', colours.yellow],
        newline,
        newline,
        ['Usage: ', colours.green],
        newline,
        ['  --dryRun ', colours.white],
        ['Runs the releaser, but will not modify or commit any files', colours.blue],
        newline,
        ['  --help   ', colours.white],
        ['Shows this message', colours.blue],
      ])
      process.exit(0)
    }

    if (!execSync('git status', { encoding: 'utf8' }).includes('working tree clean') && !isDryRun) {
      throw new Error('Git working tree is not clean')
    }

    const latestTag = execSync('git describe --tags --abbrev=0')
      .toString()
      .trim();

    const commits = execSync(`git log --oneline --no-merges ${latestTag}..HEAD`)
      .toString()
      .trim()
      .split('\n')
      .filter(Boolean);

    const countCommits = (type: string) => commits.filter((c) => c.includes(`${type}:`)).length;

    const numberOfFeatureCommits = countCommits('feat');
    const numberOfChoreCommits = countCommits('chore');
    const numberOfFilesChanged = parseInt(
      execSync(`git diff --name-only ${latestTag}..HEAD | wc -l`)
        .toString()
        .trim(),
      10,
    );

    log.blue(`Commits: ${commits}`);
    log.blue(`Latest tag: ${latestTag}`);
    log.blue(`Files changed: ${numberOfFilesChanged}`);

    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const [major, minor, patch] = pkg.version.split('.').map(Number);

    let newMajor = major;
    let newMinor = minor;
    let newPatch = patch;

    if (numberOfFeatureCommits > 0 || numberOfFilesChanged >= 25) {
      newMajor++;
      newMinor = 0;
      newPatch = 0;
    }
    else if (numberOfChoreCommits > 0) {
      newMinor++;
      newPatch = 0;
    }
    else {
      newPatch++;
    }

    const newVersion = `${newMajor}.${newMinor}.${newPatch}`;
    log.blue(`New version: ${newVersion}`);

    fs
      .globSync('**/{package.json,package-lock.json}', {
        exclude: ['**/node_modules/**', '**/dist/**']
      })
      .map(pkgPath => {
        const pkgContents = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        pkg.version = newVersion;
        !isDryRun && fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
        log.green(`Updated ${pkgPath} (${pkgContents.name}) to version ${newVersion}`)
      })

    const now = (() => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      const ordinal = (n: number) => {
        if (n > 3 && n < 21) {
          return n + "th"; // 11th–20th
        }

        switch (n % 10) {
          case 1: return n + "st";
          case 2: return n + "nd";
          case 3: return n + "rd";
          default: return n + "th";
        }
      }

      const date = new Date()
      const day = ordinal(date.getDate());
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      let hours = date.getHours();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12; // convert to 12-hour format
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${day} ${month} ${year} ${pad(hours)}:${minutes}:${seconds}${ampm}`;
    })()

    const entry = `## Version ${newVersion}\nReleased **${now}** - *${commits.length} commits*\n- ${commits.join('\n- ')}`;
    const changelogFilePath = './CHANGELOG.md';
    const existingChangelog = fs.existsSync(changelogFilePath) ? fs.readFileSync(changelogFilePath).toString() : '';
    const newChangelog = `${entry}\n\n${existingChangelog} `;

    if (!isDryRun) {
      fs.writeFileSync(changelogFilePath, newChangelog);
      execSync('git add .');
      execSync(`git commit -m 'release: version ${newVersion}'`);
      execSync('git push');
      execSync(`git tag ${newVersion}`);
      execSync('git push --tags');
    } else {
      log.blue('No changes have been made as the dry run flag (--dryRun) is present')
    }
  } catch (err) {
    log.red('\n@iamtomhewitt/release failed to run:')
    log.red(`${err}`)
    process.exit(1)
  }
})();