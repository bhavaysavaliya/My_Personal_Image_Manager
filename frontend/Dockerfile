FROM node:alpine3.18
WORKDIR /app
ADD package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","run","dev","--","--host"]