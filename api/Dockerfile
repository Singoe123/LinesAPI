FROM node:20.14.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install pm2 -g

CMD ["pm2-runtime", "start", "server.js"]
