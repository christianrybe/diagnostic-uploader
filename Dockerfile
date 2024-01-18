FROM node:lts-iron

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY dist .

EXPOSE 8000

CMD ["node", "server.js"]