import camelCase from 'camelcase';
import shell from 'shelljs';
import {checkPath} from '../../utils/index.js';

export class CreateEntity {
    constructor() {}

    createFolder(type, folder) {
        let pathModule = '';
        let path = '';
        let pathStores;

        switch (type) {
            case 'component':
                path = `./src/components/${folder}/${camelCase(`v-${name}`, { pascalCase: true })}`;
                if (!checkPath(path)) shell.mkdir(path);
                break;

            case 'module':
                switch (folder) {
                    case 'stores':
                        pathModule = `./src/modules/${camelCase(name, { pascalCase: true })}`;
                        pathStores = `${pathModule}/stores`;
                        path = `${pathStores}/${camelCase(name, { pascalCase: true })}`;
                        if (!checkPath(pathModule)) shell.mkdir(pathModule);
                        if (!checkPath(pathStores)) shell.mkdir(pathStores);
                        if (checkPath(pathModule) && checkPath(pathStores) && !checkPath(path)) shell.mkdir(path);
                        break;

                    case 'locale':
                    case 'router':
                    case 'store':
                        path = `./src/modules/${camelCase(name, { pascalCase: true })}`;
                        if (!checkPath(path)) shell.mkdir(path);
                        break;

                    default:
                        pathModule = `./src/modules/${camelCase(name, { pascalCase: true })}`;
                        path = `${pathModule}/${folder}`;
                        if (!checkPath(pathModule)) shell.mkdir(pathModule);
                        if (checkPath(pathModule) && !checkPath(path)) shell.mkdir(path);
                }
                break;
        }

        return path;
    }
}
