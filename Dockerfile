FROM node:8.1.2
MAINTAINER David Inga <david.inga@vizzuality.com>

ARG datasetEnv production
ENV DATASET_ENV $datasetEnv

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y bash git build-essential \
    automake autoconf make g++ libtool \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && npm install -g node-gyp --loglevel warn \
    && mkdir -p /usr/src/app && mkdir -p /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
