#!/bin/bash

git pull origin
yarn
yarn build
docker compose up -d --build