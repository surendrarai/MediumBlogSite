const Story = require('../model/Story')
const User = require('../model/User')
const fs = require('fs')

module.exports = {
    addStory: (req, res, next) => {
            new Story(req.body).save((err, story) => {
                if (err)
                    res.send(err)
                else if (!story)
                    res.send(400)
                else {
                    return story.addAuthor(req.body.author_id).then((_story) => {
                        return res.send(_story)
                    })
                }
                next()
            })
        
    },
    getAll: (req, res, next) => {
        Story.find(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, story)=> {
            if (err)
                res.send(err)
            else if (!story)
                res.send(404)
            else
                res.send(story)
            next()            
        })
    },

    /**
     * comment, author_id, story_id
     */
    commentStory: (req, res, next) => {
        Story.findById(req.body.story_id).then((story)=> {
            return story.comment({
                author: req.body.author_id,
                text: req.body.comment
            }).then(() => {
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },

    /**
     * story_id
     */
    getStory: (req, res, next) => {
        Story.findById(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, story)=> {
            if (err)
                res.send(err)
            else if (!story)
                res.send(404)
            else
                res.send(story)
            next()            
        })
    }
}