FROM mongo:7.0.11

RUN apt-get update && apt-get install -y vim && rm -rf /var/lib/apt/lists/*

COPY ./init.js /docker-entrypoint-initdb.d/
COPY ./docs.js /mongo-queries/
