import chalk from 'chalk';

export const log = (folder, name, status) => {
    return status
        ? console.log(`${chalk.reset.inverse.green.bold(' SUCCESS ')} ${chalk.gray(`creating file ${folder}`)}${chalk.white(name)}`)
        : console.log(`${chalk.reset.inverse.red.bold(' FAILED ')} ${chalk.gray(`file ${folder}${chalk.white(name)} already exist`)}`);
};
