'use strict'

const Joi = require('joi')

const envVarsSchema = Joi.object({ 
    TWILIO_ACCOUNT_SID: Joi.string().required(),
    TWILIO_AUTH_TOKEN: Joi.string().required(),
    TWILIO_NUMBER: Joi.string().required(),
}).unknown().required()

const { error, value: envVars } =  envVarsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    twilio: {
        account_sid: envVars.TWILIO_ACCOUNT_SID,
        auth_token: envVars.TWILIO_AUTH_TOKEN,
        number: envVars.TWILIO_NUMBER,
    }
}

module.exports = config