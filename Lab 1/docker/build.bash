#!/bin/bash

SIM_ROOT="$(pwd)"
echo ${SIM_ROOT}
docker build -t my-apache2 -f "${SIM_ROOT}/docker/Dockerfile" "${SIM_ROOT}"