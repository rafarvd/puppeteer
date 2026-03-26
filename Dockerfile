FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY package*.json ./
COPY ecosystem.config.js ./

RUN npm install
RUN npm install -g pm2

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
