FROM node:7.2.1
MAINTAINER David Inga <david.inga@vizzuality.com>

ENV NAME prep-app
ENV NODE_ENV production

# Install dependencies
RUN apt-get update && \
    apt-get install -y bash git python build-essential

RUN npm install --silent -g pm2

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME

COPY . /usr/src/$NAME

# Install app dependencies
COPY package.json /usr/src/$NAME/
RUN npm install --silent --dev

# Generate statics files
RUN npm run build

EXPOSE 3000
CMD pm2 start --no-daemon processes.json
