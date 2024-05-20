FROM node:20-alpine

ENV NODE_ENV development
ENV HOME_APP /app

WORKDIR ${HOME_APP}

COPY package*.json ${HOME_APP}

RUN npm i

COPY . .