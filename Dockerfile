FROM node:14.16.1-alpine

ARG datasetEnv=production
ARG facebookUser=worldresources
ARG twitterUser=worldresources
ARG apiUrl=https://www.prepdata.org/api
ARG assetsUrl=
ARG rwApiUrl=https://api.resourcewatch.org/v1
ARG basemapUrl=https://api.mapbox.com/styles/v1/resourcewatch/cjjr8d2qw19y92smuuzydlpdv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w
ARG nodeEnv=production
ARG callbackUrl=https://prepdata.org/auth

ENV DEBIAN_FRONTEND noninteractive
ENV RW_API_LOGIN_URL https://api.resourcewatch.org/auth
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

RUN apk update && apk add --no-cache \
    build-base gcc bash git \
    cairo-dev pango-dev jpeg-dev

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --prod --ignore-optional --frozen-lockfile

# Bundle app source
COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
