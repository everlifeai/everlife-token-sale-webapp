'use strict';
require('dotenv').config();
const joi = require('joi');

const schema = joi.object({
  CAPTCH_SITE_KEY:  joi.string().required(),
  STELLAR_ENV:      joi.string().required(),
  IDM_PLUGIN_JS:    joi.string().required(),
  IDM_PLUGIN_TOKEN: joi.string().required(),
  MAILGUN_SENDER_FROM: joi.string().required(),
  STELLAR_TESTNET: joi.string().required()
})
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, schema);
if (error) {
  throw new Error(`Configuration validation error: ${error}`)
}

module.exports = {
  NODE_ENV: '"production"',
  CAPTCH_SITE_KEY:  JSON.stringify(envVars.CAPTCH_SITE_KEY),
  STELLAR_ENV:      JSON.stringify(envVars.STELLAR_ENV),
  IDM_PLUGIN_JS:    JSON.stringify(envVars.IDM_PLUGIN_JS),
  IDM_PLUGIN_TOKEN: JSON.stringify(envVars.IDM_PLUGIN_TOKEN),
  MAILGUN_SENDER_FROM: JSON.stringify(envVars.MAILGUN_SENDER_FROM),
  STELLAR_TESTNET: JSON.stringify(envVars.STELLAR_TESTNET)
};
