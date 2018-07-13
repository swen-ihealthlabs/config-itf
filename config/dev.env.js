'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const path = require('path');
require('dotenv').config();

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IDENTITY_PATH: path.join(process.env.HOME, '.ssh/paris_aws_key_pair.pem'),
  HOST: process.env.HOST,
  USERNAME: process.env.USERNAME,
  CONFIGPATH: process.env.CONFIGPATH,
  DEMOENV: process.env.DEMOENV
});
