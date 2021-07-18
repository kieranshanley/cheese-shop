#!/bin/bash

cwd=$(pwd)

cd ../containers/api/
docker build . -t cheese_api

cd ${cwd}
