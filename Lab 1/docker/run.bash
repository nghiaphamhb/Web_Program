#!/bin/bash

# Written by Huynh Tan Cuong <huynhtancuongrus@gmail.com>, November 2024

SIM_ROOT="$(pwd)"

IMG_NAME="my-apache2"


### DOCKER RUN ----------------------------------------------------------- #

docker run  \
    -ti --rm \
    -v "${SIM_ROOT}/static":/usr/local/apache2/htdocs/:ro \
    -v "${SIM_ROOT}/conf/docker-httpd.conf":/usr/local/apache2/conf/httpd.conf:ro \
    -v "${SIM_ROOT}/fcgi-bin":/usr/local/apache2/fcgi-bin:ro \
    --net=host \
    --name "my-webserver" ${IMG_NAME}
