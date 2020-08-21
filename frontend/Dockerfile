FROM node:dubnium-alpine AS builder
WORKDIR /home/app/angular
COPY package.json .
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
COPY . .
RUN ng build --prod

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /home/app/angular/dist/ .
COPY --from=builder /home/app/angular/nginx.conf /etc/nginx/nginx.conf
