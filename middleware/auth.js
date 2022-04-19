const Joi = require('joi');
const config = require('../config');
const locals = require('../locales');
const jwt = require("jsonwebtoken");
const bearer = require("hapi-auth-bearer-token");
const authValidator = require("./validator")

const internals = {};
exports.plugin = {
    pkg: require('../package.json'),
    register: (server, { debug }) => {
        server.register(bearer);
        server.auth.scheme(config.auth.authKey, internals.implementation);
        server.auth.strategy('user', config.auth.authKey);
        server.auth.strategy('admin', config.auth.authKey);
        server.auth.strategy('guest', config.auth.authKey);
        server.auth.strategy('basic', config.auth.authKey);
        server.auth.default('basic');
    }
}

exports.authBearer = {
    plugin: bearer,
}

internals.implementation = () => ({
    async authenticate(req, reply, next) {
        if (!req.headers.authorization || (req.headers.authorization.indexOf('Basic ') === -1 && req.headers.authorization.indexOf('Bearer ') === -1)) {
            return reply.response({ message: locals["genericErrMsg"]["401"] }).code(401).takeover();
        }

        if (req.headers.authorization.indexOf('Basic ') !== -1) {
            const result = await authValidator.strategiesValidator(req, 'basic')
            if(result) {
                return reply.response({ message: result.message }).code(result.code).takeover();
            }

            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credential = await Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = await credential.split(':');

            const credentials = {
                username,
                password
            }

            if (username === config.auth.basicAuth.split(":")[0] && password === config.auth.basicAuth.split(":")[1]) {
                return reply.authenticated({ credentials })
            } else {
                return reply.response({ message: locals["genericErrMsg"]["401"] }).code(401).takeover();
            }
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const result = await jwt.verify(token, config.auth.authKey);
            console.log(result)
            return reply.continue;

        }
    }
});

const genTokenSchema = Joi.object({
    userId: Joi.string().required(),
    userType: Joi.string().valid('user', 'admin', 'guest').required(),
    metaData: Joi.object().required(),
    accessTTL: Joi.string().optional(),
}).unknown().required();

exports.generateTokens = async (user) => {
    const { error, value } = await genTokenSchema.validate(user);
    if (error) {
        return error;
    }

    const token = await jwt.sign(
        value,
        config.auth.authKey,
        {
            expiresIn: config.auth.expireTime
        }
    );

    return token;
};