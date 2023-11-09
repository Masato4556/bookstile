FROM node:20.9.0-bookworm
WORKDIR /web

RUN ["npm", "install", "-g", "npm@10.1.0"]
COPY ./web/package*.json ./
RUN [ "npm", "install" ]