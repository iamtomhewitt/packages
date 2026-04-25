import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintFilesIgnoredByDefault = [
  'coverage',
  'dist',
  'node_modules',
  'storybook-static',
  'target',
];

const showHelp = () => {
  const settings: any = {
    '--fix': 'Automatically fix problems',
    '--help': 'Shows this message',
    '--ignorePatterns': 'Comma separated list of files to ignore (.scss files are not included!)',
    '--sourceFolder': 'What to lint, can be relative or absolute path',
    '--type': 'One of: \'typescript\', \'typescript-react\', \'javascript\', \'javascript-react\'',
  };

  showVersion();

  Object.entries(settings).forEach((s) => {
    let out = chalk.blue(s[0].padEnd(20));
    out += chalk.green(settings[s[0]]);
    console.log(out);
  });

  console.log(chalk.blue('\nThe following folders are ignored by default:'), eslintFilesIgnoredByDefault);
};

const showVersion = () => {
  const { version } = getPackageJson();
  console.log(chalk.white(`Retail Linter ${version}`));
};

const getPackageJson = () => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json')).toString());
};

export const retailLinter = {
  eslintFilesIgnoredByDefault,
  getPackageJson,
  showHelp,
  showVersion,
};