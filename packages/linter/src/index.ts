#!/usr/bin/env node

import argsParser from 'args-parser';

import { eslint, markdownLint, stylelint } from './linters';
import { log, retailLinter, versionChecker } from './lib';

(async () => {
  const args = argsParser(process.argv);
  const { sourceFolder, help, type } = args;

  if (help) {
    retailLinter.showHelp();
    process.exit(0);
  }

  if (!sourceFolder || !type) {
    throw new Error('--sourceFolder or --type was not specified!');
  }

  const allowedTypes = [
    'javascript-react',
    'typescript-react',
    'javascript',
    'typescript',
  ];

  if (!allowedTypes.includes(type)) {
    throw new Error(`${type} is not a valid type!`);
  }

  await versionChecker.checkVersion();

  retailLinter.showVersion();

  const linters = [
    eslint,
    ...type.includes('react') ? [stylelint] : [],
    markdownLint,
  ];

  for (const linter of linters) {
    const code = await linter.lint();

    if (code !== 0) {
      process.exit(1);
    }
  }

  process.exit(0);
})().catch((error) => {
  log.error('There was an error!');
  log.log(error);
  retailLinter.showHelp();
  process.exit(1);
});
