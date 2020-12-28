const mongoose = require('mongoose')

let StorySchema = new mongoose.Schema(
    {
        text: String,
        title: String,
        description: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);

StorySchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}
StorySchema.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}
StorySchema.methods.getUserStory = function (_id) {
    Story.find({'author': _id}).then((story) => {
        return story
    })
}
module.exports = mongoose.model('Story', StorySchema)