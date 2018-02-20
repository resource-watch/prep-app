FROM node:8.1.2

ARG datasetEnv=production
ARG facebookUser=worldresources
ARG twitterUser=worldresources
ARG apiUrl=https://prepdata.org/api
ARG assetsUrl=
ARG rwApiUrl=https://api.resourcewatch.org/v1
ARG basemapUrl=https://api.mapbox.com/styles/v1/wri/cism5nsz4007t2wnrp5xslf7s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3JpIiwiYSI6Ik9TY2w5RTQifQ.0HV7dQTjK40mk7GpNNA64g
ARG nodeEnv=production
ARG callbackUrl=https://prepdata.org/auth

ENV RW_API_LOGIN_URL https://production-api.globalforestwatch.org/auth
ENV RW_API_IS_LOGGEDIN_URL https://api.resourcewatch.org/auth/check-logged
ENV CALLBACK_URL $callbackUrl
ENV APPLICATIONS prep
ENV DATASET_ENV $datasetEnv
ENV FACEBOOK_USER $facebookUser
ENV TWITTER_USER $twitterUser
ENV API_URL $apiUrl
ENV ASSETS_URL $assetsUrl
ENV RW_API_URL $rwApiUrl
ENV BASEMAP_TILE_URL $basemapUrl
ENV NODE_ENV $nodeEnv
ENV GOOGLE_ANALYTICS UA-67196006-2

RUN apt-get update && \
    apt-get install -y bash git build-essential \
    automake autoconf make g++ libtool \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && npm install -g node-gyp --loglevel warn \
    && mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN yarn install --production=true --silent

# Bundle app source
COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
