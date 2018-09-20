import 'jquery';
import 'underscore';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/site.css';

import {App} from './app'

$(document).ready(() => {

    new App();

    $('#login').html(AlbyJs.AuthService.user ? AlbyJs.AuthService.user.profile.name : `<span onclick="AlbyJs.AuthService.signin()" class="nav-link">Login</span>`);

});
