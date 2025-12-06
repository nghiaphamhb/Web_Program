FROM httpd:2.4.62-bookworm
RUN apt-get update && apt-get install -y git libapr1 libapr1-dev apache2-dev
RUN git clone https://github.com/FastCGI-Archives/mod_fastcgi.git /mod_fastcgi && \
    cd /mod_fastcgi/ && \
    apxs -i -a -n fastcgi -o mod_fastcgi.so -c *.c
RUN apt-get install -y default-jre
# COPY ../static/ /usr/local/apache2/htdocs/
# COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf