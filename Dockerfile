FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm cache clean --force && npm install
COPY . /app
CMD ["npm", "start"]
EXPOSE 3000
