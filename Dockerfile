FROM node:24.14-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE $FRONT_PORT

CMD ["npm", "run", "dev"]
