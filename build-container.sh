#!/usr/bin/env bash

docker build -t node-web-app_ultimate-pizza-manager .
docker run -p 80:8080 -d node-web-app_ultimate-pizza-manager
