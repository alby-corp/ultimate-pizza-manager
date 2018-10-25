import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import passport from "passport";
import azureAD from "passport-azure-ad";

import {ReadController, WriteController} from './api';
import {UltimatePizzaManagerContext} from './data-layer/ultimate-pizza-manager-context';
import {Router} from './router';

import config from './settings';

import {Common} from './model'

export const App = (function () {

    const privateProps = new WeakMap();

    const __dirname = path.dirname(import.meta.url.replace(process.platform === "win32" ? 'file:///' : 'file://', ''));

    return class {

        constructor(app) {

            const context = new UltimatePizzaManagerContext(config["ultimate-pizza-manager-debug-connection-string"]);
            const readCtrl = new ReadController(context);
            const writeCtrl = new WriteController(context);

            console.log(config["azure-ad-debug-config"]);

            passport.use(new azureAD.BearerStrategy(
                JSON.parse(config["azure-ad-debug-config"]),
                (token, done) => {
                    const user = new Common.User(token.oid, token.name);
                    context.createUser(user)
                        .then(() => done(null, user, token))
                        .catch(error => done(error, null, null));

                }
            ));

            const routes = express.Router();
            const router = new Router(routes, readCtrl, writeCtrl, passport);

            app.use(passport.initialize());
            app.use(passport.session());

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
