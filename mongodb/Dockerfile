FROM mongo:latest

COPY ./init.js /docker-entrypoint-initdb.d/
COPY ./docs.js /mongo-queries/
RUN chmod +x /docker-entrypoint-initdb.d/init.js