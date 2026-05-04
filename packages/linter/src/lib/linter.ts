import chalk from 'chalk';

const currentVersion = __VERSION__; // injected by esbuild at build time

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
  console.log(chalk.white(`Retail Linter ${currentVersion}`));
};

export const linter = {
  eslintFilesIgnoredByDefault,
  showHelp,
  showVersion,
};