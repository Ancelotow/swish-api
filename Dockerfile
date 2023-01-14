FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm i --production
CMD ["npm", "start"]
