#!/bin/bash

cwd=$(pwd)

cd ../containers/view/cheese-view
docker build . -t cheese_view

cd ${cwd}
