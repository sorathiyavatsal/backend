'use strict'

const Joi = require('joi');
const { ObjectId } = require('mongodb');
Joi.objectId = require('joi-objectid')(Joi)
const logger = require('winston');
const locals = require('../../locales');
const userCollection = require("../../models/users")
const userVerificationCollection = require("../../models/userVerification")

/**
 * @description for user signIn
 * @property {string} authorization - authorization
 * @property {string} lang - language
 * @property {string} categoryName - for select specific category details
 * @returns 200 : Success
 * @returns 500 : Internal Server Error
 * 
 * @author Vatsal Sorathiya
 * @date 11-Dec-2020
 */

const validator = Joi.object({
    phoneNumber: Joi.string().description(locals['users'].Post.fieldsDescription.phoneNumber),
    email: Joi.string().description(locals['users'].Post.fieldsDescription.email),
}).unknown();

const handler = async (req, res) => {
    try {
        if (!(req.payload.phoneNumber || req.payload.email)) {
            return res.response({ message: locals['users'].Post.error.phoneEmail }).code(400);
        }

        let condition = []
        let userDetails = {}
        userDetails['status'] = true
        
        if (req.payload.email) {
            condition.push({'email': req.payload.email})
            userDetails['email'] = req.payload.email
            userDetails['verifyType'] = "EMAIL"
        }

        if (req.payload.phoneNumber) {
            condition.push({'phoneNumber': req.payload.phoneNumber})
            userDetails['phoneNumber'] = req.payload.phoneNumber
            userDetails['verifyType'] = "SMS"
        }

        const verifyUser = await userCollection.Select({
            $or: condition
        });

        if (!(Array.isArray(verifyUser) && verifyUser.length)) {
            const userResult = await userCollection.Insert(userDetails)
            if(userResult.insertedCount >= 1) {
                userDetails = await userCollection.SelectById(userResult.insertedIds[0]);
            }
            userDetails['registrationType'] = 'NEW'
        } else {
            userDetails = verifyUser[0]
            userDetails['registrationType'] = 'OLD'
        }

        if(userDetails.verifyType == "SMS") {
            //await twilio.sendSMS(userDetails['phoneNumber'])
            let max = 9999
            let min = 1000

            const otp = await Math.floor(
                Math.random() * (max - min + 1) + min
            );

            await userVerificationCollection.Insert({
                otp: otp,
                createdBy: ObjectId(userDetails._id),
                verificationStatus: false,
                createdAt: new Date()
            })
            
            userDetails['otp'] = otp
        }

        return res.response({ message: locals["genericErrMsg"]["200"], data: userDetails }).code(200);
    } catch (e) {
        logger.error(e.message)
        return res.response({ message: locals["genericErrMsg"]["500"] }).code(500);
    }
}

const response = {
    status: {
        200: Joi.object({ message: Joi.any().default(locals["genericErrMsg"]["200"]), data: Joi.object() }),
        500: Joi.object({ message: Joi.any().default(locals["genericErrMsg"]["500"]) }),
    }
}

module.exports = { validator, response, handler }