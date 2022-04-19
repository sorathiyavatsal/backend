const categories = require('./categories');
const users = require('./users')
const home = require('./home')

module.exports = [].concat(
    categories,
    users,
    home
)