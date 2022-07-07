FROM node:8

COPY . .
COPY package.*json .
RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]