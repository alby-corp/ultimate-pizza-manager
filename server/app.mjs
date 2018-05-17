import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import {ReadController, WriteController} from './api';
import {UltimatePizzaManagerContext} from './data-layer/ultimatePizzaManagerContext';
import {Router} from './router';

const __dirname = path.dirname(import.meta.url.replace('file:///', ''));

export const App = (function () {

    const privateProps = new WeakMap();

    return class App {

        constructor(app) {

            const context = new UltimatePizzaManagerContext();
            const readCtrl = new ReadController(context);
            const writeCtrl = new WriteController(context);

            const routes = express.Router();
            const router = new Router(routes, readCtrl, writeCtrl);

            app.use(express.urlencoded({extended: false}));

            app.use('/app', express.static(path.join(__dirname, '../app')));

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
