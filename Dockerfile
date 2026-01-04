FROM node:18-alpine

WORKDIR /home/app

COPY my-app ./my-app
COPY api ./api

WORKDIR /home/app/my-app
RUN npm install
RUN npm run build

WORKDIR /home/app/api
RUN npm install

CMD ["node","server.js"] 
