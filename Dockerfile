# Dockerfile
FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache \
    docker-cli \
    docker-compose \
    git \
    bash

# Set working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first for layer caching
COPY package*.json ./

# Install NPM dependencies early (faster rebuilds)
RUN npm install

# Now copy the rest of the app
COPY . .

# Default command for running tests
CMD ["npm", "test"]
