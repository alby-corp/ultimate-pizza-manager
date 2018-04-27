#!/usr/bin/env bash

docker build -t node-web-app_upm .
docker run -p 80:8080 -d node-web-app_upm
