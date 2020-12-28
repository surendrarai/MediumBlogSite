const storycontroller = require('../controller/storyController')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    /**
     * get all stories
     */
    router
        .route('/stories')
        .get(storycontroller.getAll)

    /**
     * add an story
     */
    router
        .route('/story')
        .post(multipartWare, storycontroller.addStory)

    /**
     * comment on an story
     */
    router
        .route('/story/comment')
        .post(storycontroller.commentStory)

    /**
     * get a particlular story to view
     */
    router
        .route('/story/:id')
        .get(storycontroller.getStory)
}