FROM node:18-alpine as build-image
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm install
EXPOSE 5000
CMD [ "npm",  "run", "dev" ]
