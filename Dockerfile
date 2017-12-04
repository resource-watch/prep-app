FROM node:8.1.2
MAINTAINER David Inga <david.inga@vizzuality.com>

ARG datasetEnv=production
ARG facebookUser=worldresources
ARG twitterUser=worldresources
ARG apiUrl=https://staging.prepdata.org/api
ARG assetsUrl=
ARG rwApiUrl=https://api.resourcewatch.org/v1
ARG basemapUrl=https://api.mapbox.com/styles/v1/wri/cism5nsz4007t2wnrp5xslf7s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3JpIiwiYSI6Ik9TY2w5RTQifQ.0HV7dQTjK40mk7GpNNA64g
ARG nodeEnv=production

ENV APPLICATIONS prep
ENV DATASET_ENV $datasetEnv
ENV FACEBOOK_USER $facebookUser
ENV TWITTER_USER $twitterUser
ENV API_URL $apiUrl
ENV ASSETS_URL $assetsUrl
ENV RW_API_URL $rwApiUrl
ENV BASEMAP_TILE_URL $basemapUrl
ENV NODE_ENV $nodeEnv

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
