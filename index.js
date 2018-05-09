#!/usr/bin/env node

/**
 * Module dependencies.
 */
const fs = require('fs');

const http = require('http');

const https = require('https');
const privateKey = fs.readFileSync('./infrastructure/sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('./infrastructure/sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const helpers = require('./server/helpers/helpers');
const app = require('./server/app');

/**
 * Set  HTTP and HTTPS ports.
 */
const httpPort = helpers.normalizePort(process.env.HTTP_PORT || '8080');
const httpsPort = helpers.normalizePort(process.env.HTTPS_PORT || '443');

/**
 * Create HTTP and HTTPS servers.
 */
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(httpPort);
httpServer.on('error', helpers.onError);
httpServer.on('listening', helpers.onListening(httpServer, 'HttpServer'));

httpsServer.listen(httpsPort);
httpsServer.on('error', helpers.onError);
httpsServer.on('listening', helpers.onListening(httpsServer, 'HttpsServer'));