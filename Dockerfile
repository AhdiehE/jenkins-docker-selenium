# Use Jenkins LTS base image (Debian-based)
FROM jenkins/jenkins:lts

USER root

# Install dependencies: Docker CLI, Compose, Git, Bash, Node.js, NPM
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    docker-compose \
    git \
    curl \
    bash && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    usermod -aG docker jenkins && \
    apt-get clean

USER jenkins

# Set working directory
WORKDIR /usr/src/app

# Copy package.json for caching
COPY --chown=jenkins:jenkins package*.json ./

# Install NPM dependencies
RUN npm install

# Copy rest of the source code
COPY --chown=jenkins:jenkins . .

# Default command
CMD ["npm", "test"]
