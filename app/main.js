import 'jquery';
import 'underscore';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/site.css';

import {Core} from './core'
import {AppModule} from './app.module'

document.addEventListener('DOMContentLoaded', () => {
    Core.bootstrapModule(AppModule);
});