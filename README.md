# Ascribe Content Monitor

This tool fulfills two tasks:

1. Gives an overview over the last X files that have been uploaded to ascribe
2. Allows for content to be removed with the click of a button


## Installation

Rename the `.env-template` file to `.env`. Also make sure that you have `AWS_ACCESS_KEY_ID`
and `AWS_SECRET_ACCESS_KEY` in your environment variables, in order to access S3.

```bash
$ npm install
$ mv .env-template .env
# edit .env
$ node server.js
```

## Security Notice

The script is super easy, which means that you can very easily make changes to it as well.
Keep in mind though, that this application has basically full power over our S3 bucket.
So don't do anything stupid, stupid!
