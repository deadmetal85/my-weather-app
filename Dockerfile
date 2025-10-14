# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:alpine AS build

# Set the working directory inside the container
WORKDIR /client

# Copy package-related files first to leverage Docker's caching mechanism
COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /client/dist /usr/share/nginx/html