import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import {ReadController, WriteController} from './api';
import {UltimatePizzaManagerContext} from './data-layer/ultimate-pizza-manager-context';
import {Router} from './router';

import config from './settings';

export const App = (function () {

    const privateProps = new WeakMap();

    const __dirname = path.dirname(import.meta.url.replace(process.platform === "win32" ? 'file:///' : 'file://', ''));

    return class {

        constructor(app) {

            const context = new UltimatePizzaManagerContext(config["ultimate-pizza-manager-debug-connection-string"]);
            const readCtrl = new ReadController(context);
            const writeCtrl = new WriteController(context);

            const routes = express.Router();
            const router = new Router(routes, readCtrl, writeCtrl);

            app.use(express.urlencoded({extended: false}));

            app.use('', express.static(path.resolve(__dirname, '../dist')));

            app.use(bodyParser.json());
            app.use('/api', router.configuration);

            app.use((req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

            privateProps.set(this, {
                app: app
            })

        }

        get configuration() {
            return privateProps.get(this).app;
        }
    }
})();
