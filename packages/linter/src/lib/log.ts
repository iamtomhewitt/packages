import chalk from 'chalk';

export const log = {
  error: (message: string) => console.log(chalk.red.bold(message)),
  info: (message: string) => console.log(chalk.blue(message)),
  log: (message: string) => console.log(message),
  success: (message: string) => console.log(chalk.greenBright(message)),
  warning: (message: string) => console.log(chalk.yellow(message)),
};