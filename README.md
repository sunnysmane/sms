# SMS Code Challenge

## Installation
1. Install docker if not installed as instructed on link https://docs.docker.com/get-docker/
2. Install docker compose if not installed as instructed on link https://docs.docker.com/compose/install/

## Run Application

1. With Docker Compose
```
docker-compose up
```
This will run the backend, frontend and database containers.

Now Goto browser and open below link

[http://0.0.0.0:40000](http://0.0.0.0:40000)

2. Without Docker Compose (Running Individually)
```
cd backend/
export NODE_ENV=env-local

cd ../frontend/
ng serve
```
Now Goto browser and open below link

[http://0.0.0.0:4200](http://0.0.0.0:4200)

## Technologies Used
* Backend
  * NodeJS
  * Hapi
* Database
  * MongoDB
* Frontend
  * Angular


