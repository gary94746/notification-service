# Information

Simple web-push-notifications service in NestJs

First generate your pair of vapid keys, this will return an object with public and private key, replace them in .env file, also replace publicKey in views/index.hbs on line 47 
```js
const vapidKeys = webpush.generateVAPIDKeys();
```

This application doesn't store the token persistant, simple explain porpouse only

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
