FROM node:16.13.2-alpine

WORKDIR /usr/src/app

RUN npm install -g pm2

COPY ./package*.json ./
#RUN npm install --network-timeout 600000
#RUN npm install

#RUN npm install -D next-sitemap
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--name", "jaksim31",  "--", "start"]
