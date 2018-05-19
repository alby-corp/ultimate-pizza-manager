import path from 'path';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';

import {ReadController, WriteController} from './api';
import {UltimatePizzaManagerContext} from './data-layer/ultimate-pizza-manager-context';
import {Router} from './router';

export const App = (function () {

    const privateProps = new WeakMap();

    const __dirname = path.dirname(import.meta.url.replace('file:///', ''));
    const connectionString = JSON.parse(fs.readFileSync(path.join(__dirname, './settings.json')).toString())["ultimate-pizza-manager-connection-string"];

    return class {

        constructor(app) {

            const context = new UltimatePizzaManagerContext(connectionString);
            const readCtrl = new ReadController(context);
            const writeCtrl = new WriteController(context);

            const routes = express.Router();
            const router = new Router(routes, readCtrl, writeCtrl);

            app.use(express.urlencoded({extended: false}));

            app.use('/dist', express.static(path.join(__dirname, '../dist')));

            app.use(bodyParser.json());
            app.use('/api', router.configuration);

            app.use((req, res) => res.sendFile(path.join(__dirname, '../index.html')));

            privateProps.set(this, {
                app: app
            })

        }

        get configuration() {
            return privateProps.get(this).app;
        }
    }
})();
