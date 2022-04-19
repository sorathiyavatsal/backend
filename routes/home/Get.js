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
}).unknown();

const handler = async (req, res) => {
    try {
        const home = {
            categories:[
                {
                    _id: "622b5367a98b8e655c7559e3",
                    categoryName: "republicday",
                    title: "Happy Republic Day",
                    imges: [
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F1.jpg?alt=media&token=1642835a-5936-4153-83f7-b86df762a7cf",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F10.jpg?alt=media&token=b9772314-60f5-4434-ae78-c829882b7d4d",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F2.jpg?alt=media&token=95d894b6-251a-45cc-8b48-afb3f46a2d20",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F3.jpg?alt=media&token=eeb3e3b7-d37a-4d78-a066-fb7dcaed813b",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F4.jpg?alt=media&token=4536baaa-7171-4a29-8a78-3d51e20c23ca",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F5.jpg?alt=media&token=54ee2817-3fa0-48df-8201-9394b3b43cd9",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F6.jpg?alt=media&token=5b75f7f8-880b-47c7-b50e-a5fa99a52a1d",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F7.jpg?alt=media&token=641f1a5f-f99b-49a9-adec-a8c9b17ff7a5",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F8.jpg?alt=media&token=4074fdd4-f143-4210-890a-144cfa392156",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F9.jpg?alt=media&token=d142b647-7d05-40e0-932e-b3caca1abc45",
                    ],
                    totalCount: 10
                },
                {
                    _id: "622b53454fca26860a504d58",
                    categoryName: "makar sankranti",
                    title: "Happy Makar Sankranti",
                    imges: [
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F10_2.jpg?alt=media&token=3b6f7aae-8421-4407-9cc4-fa778d2a170c",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F1_1.jpg?alt=media&token=4a833bca-1294-465c-be5d-f38e8df06eaf",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F2_2.jpg?alt=media&token=dd5b6d06-86e1-4b85-954e-76e881390bca",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F3_2.jpg?alt=media&token=68af1d59-0cf2-4671-83e4-d5225b54635d",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F4_2.jpg?alt=media&token=2d8eb39c-b4fa-4302-a5ef-cfc1f7a7bcb7",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F5_2.jpg?alt=media&token=5f6b6fa6-51b9-44d4-8f02-ef9956f00cb9",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F6_2.jpg?alt=media&token=445fe02a-dc91-43d6-96fe-81a7927c2d75",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F7_2.jpg?alt=media&token=17a157c4-baae-4191-97c9-5e104a2ad26a",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F8_2.jpg?alt=media&token=5a2cf634-6324-4ee7-a477-17550e7924c2",
                        "https://firebasestorage.googleapis.com/v0/b/postmaker-a9468.appspot.com/o/categories%2F9_2.jpg?alt=media&token=f68a9129-6383-428b-8eae-3bc758462ef5"
                    ],
                    totalCount: 10
                }
            ]
        }

        return res.response({ message: locals["genericErrMsg"]["200"], data: home }).code(200);
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