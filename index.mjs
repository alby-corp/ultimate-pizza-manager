#!/usr/bin/env node

import fs from 'fs';
import express from 'express';

import http from 'http';
import https from 'https';

import {Helpers} from './server/helpers/helpers';
import {App} from './server/app';


(function () {

    /**
     * Import HTTPS Certificates.
     */
    const privateKey = fs.readFileSync('./infrastructure/sslcert/server.key', 'utf8');
    const certificate = fs.readFileSync('./infrastructure/sslcert/server.crt', 'utf8');
    const credentials = {key: privateKey, cert: certificate};

    /**
     * Set  HTTP and HTTPS ports.
     */
    const httpPort = Helpers.normalizePort(process.env.HTTP_PORT || '8080');
    const httpsPort = Helpers.normalizePort(process.env.HTTPS_PORT || '443');

    /**
     * Create HTTP and HTTPS servers.
     */
    const app = new App(express()).configuration;

    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    httpServer.listen(httpPort);
    httpServer.on('error', Helpers.onError);
    httpServer.on('listening', Helpers.onListening(httpServer, 'HttpServer'));

    httpsServer.listen(httpsPort);
    httpsServer.on('error', Helpers.onError);
    httpsServer.on('listening', Helpers.onListening(httpsServer, 'HttpsServer'));

})();




