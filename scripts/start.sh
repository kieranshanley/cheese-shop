#!/bin/bash

cwd=$(pwd)

cd ../containers
docker-compose up

cd ${cwd}
