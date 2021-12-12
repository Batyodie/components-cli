import shell from 'shelljs';

export const checkPath = path => {
    return shell.test('-e', path);
};
