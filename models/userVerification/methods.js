'use strict'

const ObjectID = require('mongodb').ObjectID
const Promise = require("bluebird");
const mongo = Promise.promisifyAll(require('../mongodb'))

const tablename = 'usersVerification'

const Select = async (data) => {
    const db = await mongo.get();
    return await db.collection(tablename).find(data).toArray();
}

const SelectOne = async (data) => {
    const db = await mongo.get();
    return await db.collection(tablename).findOne(data)
};

const SelectById = async (condition, requiredFeild) => {
    const db = await mongo.get();
    condition._id = await ObjectID(condition._id)
    return await db.collection(tablename).findOne(condition, requiredFeild);
}

const Insert = async (data) =>{
    const db = await mongo.get();
    return await db.collection(tablename).insert(data)
}

const UpdateStatusById = async (_id, status) => {
    const db = await mongo.get();
    return await db.collection(tablename).update({ _id: ObjectID(_id) }, { $set: data })
}

module.exports = {
    Select,
    SelectOne,
    Insert,
    SelectById,
    UpdateStatusById,
}
