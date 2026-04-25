import argsParser from 'args-parser';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { applyFixes } from 'markdownlint';
import { lint as markdownlint } from 'markdownlint/sync';

import { log } from '../lib';

const args = argsParser(process.argv);

const findMarkdownFiles = (dir = '', results: string[] = []) => {
  const ignored = new Set(['node_modules', 'CHANGELOG.md']);
  const regex = new RegExp(/(^|[\\/])[^\\/]+\.md$/i);
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignored.has(entry.name)) {
        findMarkdownFiles(fullPath, results);
      }
    }
    else if (regex.test(fullPath)) {
      if (!ignored.has(fullPath)) {
        results.push(fullPath);
      }
    }
  }

  return results;
};

const runLint = (files: string[] = []) => {
  return markdownlint({
    files,
    config: {
      'descriptive-link-text': false,
      'first-line-h1': 'warning',
      'no-inline-html': false,
      'table-column-style': false,
      line_length: false,
    },
  });
};

const lint = async () => {
  log.info('\nInspecting markdown...\n');

  const { sourceFolder, fix = false } = args;
  const files = findMarkdownFiles(sourceFolder);
  let result = runLint(files);

  if (fix) {
    for (const file of files) {
      const errors = result[file] || [];

      if (errors.length === 0) {
        continue;
      }

      const original = fs.readFileSync(path.resolve(sourceFolder + file)).toString();
      const fixed = applyFixes(original, errors);

      if (fixed !== original) {
        fs.writeFileSync(file, fixed);
      }
    }

    // Relint after fixes have been applied
    result = runLint(files);
  }

  const numberOfErrors = Object.values(result).flat().filter(x => x.severity === 'error').length;
  const numberOfWarnings = Object.values(result).flat().filter(x => x.severity === 'warning').length;

  Object.entries(result).forEach(([filePath, errors]) => {
    if (errors.length > 0) {
      log.log(chalk.underline(`${path.resolve(sourceFolder + filePath)}`));

      errors.forEach(error => {
        const description = error.ruleNames.includes('line-length') ?
          `${error.ruleDescription} - ${error.errorDetail}` :
          error.ruleDescription;

        const severity = error.severity === 'warning' ?
          chalk.yellow(error.severity.padEnd(8, ' ')) :
          chalk.red(error.severity.padEnd(8, ' '));

        console.log(
          '',
          chalk.gray(`${error.lineNumber}`.padEnd(2, ' ')),
          '',
          severity,
          '',
          description.padEnd(60, ' '),
          '',
          chalk.gray(error.ruleNames.filter(name => !name.startsWith('MD')).join('/')),
        );
      });

      log.log(' ');
    }
  });

  if (numberOfErrors > 0 || numberOfWarnings > 0) {
    const logColour = numberOfErrors > 0 ? log.error : log.warning;
    logColour(`\n✖ ${numberOfErrors + numberOfWarnings} problems (${numberOfErrors} errors, ${numberOfWarnings} warnings)`);
    logColour(`  ${numberOfErrors} errors and ${numberOfWarnings} warnings potentially fixable with the \`--fix\` option.`);
    log.log(' ');
  }

  if (numberOfErrors > 0) {
    return 1;
  }

  if (numberOfErrors === 0 && numberOfWarnings === 0) {
    log.success('Markdown is all good!');
  }

  return 0;
};

export const markdownLint = {
  lint,
};
