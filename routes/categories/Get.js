'use strict'

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const logger = require('winston');
const locals = require('../../locales');

const middleware = "";

/**
 * @description get all or specifice category details
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
    categoryName: Joi.string().description(locals['category'].Get.fieldsDescription.categoryName)
}).unknown();

const handler = async (req, res) => {
    try {

    } catch (e) {
        logger.error(e.message)
    }
}

const response = {
    status: {
        200: Joi.object({ message: Joi.any().default(locals["genericErrMsg"]["200"]), data: Joi.any() }),
        500: Joi.object({ message: Joi.any().default(locals["genericErrMsg"]["500"]) }),
    }
}

module.exports = { validator, response, handler }