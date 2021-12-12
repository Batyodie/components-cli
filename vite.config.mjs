import path from 'path';
import { defineConfig } from 'vite';

const __dirname = path.resolve();

const config = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/main.js'),
            name: 'components-cli',
            fileName: (format) => `components-cli.${format}.js`
        },
    }
});


export default config;
