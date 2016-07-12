# prep-app

Preparedness for resilience

## Install

Requirements:

* NodeJs 5.2+ [How to install](https://nodejs.org/download/)
* Heroku toolbet [How to install](https://toolbelt.heroku.com)

To install run this command:

```bash
npm install
```

## Usage

Run server locally usgin npm:

```bash
npm start
```

Run server locally using Heroku environment:

```bash
heroku local web
```

### Deploy

Configure existing heroku app:

```bash
heroku git:remote -a project
```

Run this command to publish master branch to Heroku:

```bash
git push heroku master
```

### NOTE

We set NPM_CONFIG_PRODUCTION to true by default to install production dependencies only. If you would like to install devDependencies, you can disable production mode:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

However, since you usually don’t want all development dependencies in your production builds, it’s preferable to move only the dependencies you actually need for production builds (bower, grunt, gulp, etc) into `dependencies`.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D


## LICENSE

[MIT](LICENSE)
