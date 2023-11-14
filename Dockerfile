FROM node:20.9.0-bookworm
WORKDIR /app/

RUN ["npm", "install", "-g", "npm@10.1.0"]
COPY ./package*.json /app
RUN [ "npm", "install" ]