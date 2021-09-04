FROM node:13.12.0-alpine
RUN mkdir /app
COPY . /app
WORKDIR /app
COPY package.json ./
RUN npm install
CMD ["npm", "start"]