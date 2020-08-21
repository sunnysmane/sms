FROM node:erbium-alpine
ENV NODE_ENV=production
WORKDIR /home/app/node

COPY package.json .
COPY . .
RUN npm install

CMD ["node", "index.js"]
