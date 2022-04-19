const headerValidator = require('../../middleware/validator')
const locals = require('../../locales')
const GetAPI = require('./Get')
const PostAPI = require('./Post')

module.exports = [
    {
        method: 'post',
        path: '/category',
        handler: PostAPI.handler,
        config: {
            cors : true,
            description: locals["category"].Get.ApiDescription,
            tags: ['api', 'category'],
            auth: {
                strategies: ['user', 'admin']
            },
            validate: {
                headers: headerValidator.headerAuth,
                payload: PostAPI.validator,
                failAction: (req, reply, source, error) => {
                    headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PostAPI.response
        }
    },
    {
        method: 'get',
        path: '/category',
        handler: GetAPI.handler,
        config: {
            cors : true,
            description: locals["category"].Get.ApiDescription,
            tags: ['api', 'category'],
            auth: {
                strategies: ['user', 'admin']
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
