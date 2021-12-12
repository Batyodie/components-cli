import { readFileSync } from 'fs';
import chalk from 'chalk';
import shell from 'shelljs';
import { Command } from 'commander';
const program = new Command();
import camelCase from 'camelcase';
const packageJson = readFileSync('./package.json');
const pkg = JSON.parse(packageJson);

let name = 'example';


const createComponent = {
    default: folderName => {

        const folder = `${createFolder('component', folderName)}/`;
        const file = `v${camelCase(name)}.vue`;
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.components.default} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    }
};

const createModule = {
    components: () => {
        const folder = `${createFolder('module', 'components')}/`;
        const file = 'index.ts';
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.components} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    constants: () => {
        const folder = `${createFolder('module', 'constants')}/`;
        const file = 'index.ts';
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.constants} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    locales: () => {
        const folder = `${createFolder('module', 'locales')}/`;
        const file = 'example.en.yaml';
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.locales} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    services: () => {
        const folder = `${createFolder('module', 'services')}/`;
        const file = [
            `${camelCase(name)}Service.ts`,
            'index.ts'
        ];

        const path = file.reduce((carry, item) => {
            return [...carry, folder + item];
        }, []);

        if (!checkPath(path)) {
            shell.touch(path);

            for (const index in templates.modules.services) {
                shell.exec(`cat ${templates.modules.services[index]} > ${path[index]}`);

                log(folder, file[index], true);
            }
        } else {
            for (const index in templates.modules.services) {
                log(folder, file[index], false);
            }
        }
    },

    stores: () => {
        const folder = `${createFolder('module', 'stores')}/`;
        const file = [
            `${camelCase(name)}Actions.ts`,
            `${camelCase(name)}Getters.ts`,
            `${camelCase(name)}Mutations.ts`,
            `${camelCase(name)}State.ts`,
            `${camelCase(name)}Types.ts`,
            'index.ts'
        ];

        const path = file.reduce((carry, item) => {
            return [...carry, folder + item];
        }, []);

        if (!checkPath(path)) {
            shell.touch(path);

            for (const index in templates.modules.stores) {
                shell.exec(`cat ${templates.modules.stores[index]} > ${path[index]}`);

                log(folder, file[index], true);
            }
        } else {
            for (const index in templates.modules.stores) {
                log(folder, file[index], false);
            }
        }
    },

    typings: () => {
        const folder = `${createFolder('module', 'typings')}/`;
        const file = `${camelCase(name)}Typings.ts`;
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.typings} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    views: () => {
        const folder = `${createFolder('module', 'views')}/`;
        const file = `${camelCase(name)}Index.vue`;
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.views} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    locale: () => {
        const folder = `${createFolder('module', 'locale')}/`;
        const file = 'locale.ts';
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.locale} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    router: () => {
        const folder = `${createFolder('module', 'router')}/`;
        const file = 'router.ts';
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.router} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    },

    store: () => {
        const folder = `${createFolder('module', 'store')}/`;
        const file = 'store.ts';
        const path = folder + file;

        if (!checkPath(path)) {
            shell.touch(path);
            shell.exec(`cat ${templates.modules.store} > ${path}`);

            log(folder, file, true);
        } else {
            log(folder, file, false);
        }
    }
};

const actions = {
    atoms: componentName => {
        name = componentName;
        createComponent.default('atoms');
    },

    molecules: componentName => {
        name = componentName;
        createComponent.default('molecules');
    },

    organisms: componentName => {
        name = componentName;
        createComponent.default('organisms');
    },

    templates: componentName => {
        name = componentName;
        createComponent.default('templates');
    },

    module: (moduleName, moduleType) => {
        name = moduleName;

        if (moduleType === 'all') {
            createModule.components();
            createModule.constants();
            createModule.locales();
            createModule.services();
            createModule.stores();
            createModule.typings();
            createModule.views();
            createModule.locale();
            createModule.router();
            createModule.store();
        } else {
            createModule[moduleType]();
        }
    }
};

program
    .version(pkg.version);

program
    .command('component [type] [name]')
    .description('command to generate component')
    .action((type, name) => {
        COMPONENT_TYPES.forEach(componentType => {
            if (componentType === type) actions[type](name);
        });
    });

program
    .command('module [name] [type]')
    .description('command to generate module')
    .action((name, type) => {
        MODULE_TYPES.forEach(moduleType => {
            if (moduleType === type) actions.module(name, type);
        });
    });

program.parse(process.argv);
