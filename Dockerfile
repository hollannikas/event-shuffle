FROM node:8.9.1-alpine

WORKDIR /usr/app

COPY . .

RUN yarn
