const headerValidator = require('../../middleware/validator')
const locals = require('../../locales')
const PostAPI = require('./Post')
module.exports = [
    {
        method: 'post',
        path: '/user/verifyadd',
        handler: PostAPI.handler,
        config: {
            cors : true,
            description: locals["users"].Post.ApiDescription,
            tags: ['api', 'users'],
            auth: {
                strategies: ['basic', 'user']
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
    }
]
