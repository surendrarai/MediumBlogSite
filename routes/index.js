const user = require('../routes/user')
const story = require('../routes/story')
const userRoutes = require('../routes/user')
module.exports = (router) => {
    userRoutes(router)
    story(router)
}