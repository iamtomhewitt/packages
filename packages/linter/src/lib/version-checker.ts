import chalk from 'chalk';
import nodeFetch from 'node-fetch';

const current = __VERSION__; // injected by esbuild at build time

const checkVersion = async () => {
  try {
    const url = 'https://registry.npmjs.org/@iamtomhewitt/linter';
    const response = await nodeFetch(url);
    const json = await response.json() as any;
    const { latest } = json['dist-tags'];

    if (current !== latest) {
      const topMessage = `${chalk.white('Update available')} ${chalk.grey(current)} ${chalk.white('➡️')} ${chalk.green(latest)}`;
      const bottomMessage = `${chalk.white('Run')} ${chalk.cyan(`npm i -D @iamtomhewitt/linter@${latest}`)} ${chalk.white('to update')}`;
      console.log(chalk.yellow('┏' + '━'.repeat(44) + '┓'));
      console.log(chalk.yellow('┃                                            ┃'));
      console.log(chalk.yellow('┃ ' + topMessage + ' '.repeat(12) + ' ┃'));
      console.log(chalk.yellow('┃ ' + bottomMessage + ' ┃'));
      console.log(chalk.yellow('┃                                            ┃'));
      console.log(chalk.yellow('┗' + '━'.repeat(44) + '┛'));
      console.log('\n');
    }
  }
  catch (err) {
    // If we can't fetch the version from npm, just silently ignore unless an env var is present
    if (process.env.DEBUG_RETAIL_LINTER) {
      console.error(err);
    }
  }
};

export const versionChecker = {
  checkVersion,
};