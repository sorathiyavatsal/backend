const logger = require('winston');
const config = require('../../config');


var admin = require("firebase-admin");

let state = { client: null }

exports.setupClient = async () => {
    try {

        var serviceAccount = require("./postmaker-firebase.json");

        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        });

        var accountSid = config.twilio.account_sid;
        var authToken = config.twilio.auth_token;

        state.client = require('twilio')(accountSid, authToken)

        if (state.client) {
            logger.info(`Twilio connection successfully established to ${state.client.accountSid}`)
        }
    } catch (error) {

    }
}

exports.sendSMS = async (phoneNumber) => {
    const otp = Math.floor(
        Math.random() * (max - min + 1) + min
    );

    return await state.client.messages
        .create({
            body: `Your ${config.app.name} login OTP is ${otp}`,
            from: config.twilio.number,
            to: phoneNumber
        })
}