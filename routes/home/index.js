const headerValidator = require('../../middleware/validator')
const locals = require('../../locales')
const GetAPI = require('./Get')

module.exports = [
    {
        method: 'get',
        path: '/home',
        handler: GetAPI.handler,
        config: {
            cors : true,
            description: locals["users"].Post.ApiDescription,
            tags: ['api', 'users'],
            auth: {
                strategies: ['basic', 'user']
            },
            validate: {
                headers: headerValidator.headerAuth,
                query: GetAPI.validator,
                failAction: (req, reply, source, error) => {
                    headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response
        }
    }
]
