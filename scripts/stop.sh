#!/bin/bash

cwd=$(pwd)

cd ../containers
docker-compose down

cd ${cwd}
