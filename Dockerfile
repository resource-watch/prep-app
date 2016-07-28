FROM mhart/alpine-node:6.2
MAINTAINER David Inga <david.inga@vizzuality.com>

ENV NAME prep-app

# Install dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache --update bash git openssh python \
    build-base cairo-dev

RUN npm install -g pm2

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME

# Install app dependencies
COPY package.json /usr/src/$NAME/
RUN npm install

# Bundle app source
COPY . /usr/src/$NAME

EXPOSE 3000
CMD pm2 start --no-daemon processes.json
