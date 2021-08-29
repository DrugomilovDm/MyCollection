const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const events = require('events')
const {Comment} = require('../models/models')
const emitter = new events.EventEmitter();


router.get('/getAllComments', async (req, res) => {
    try {
        const {id} = req.query
        const comments = await Comment.findAll({where: {itemId: id}})
        comments.reverse()
        res.json(comments)
    } catch (e) {
        console.log(e)
    }
})
router.get('/getComment', async (req, res) => {
    try {
        emitter.once('newMessage', (comment) => {
            res.json(comment)
        })
    } catch (e) {
        console.log(e)
    }
})
router.post('/newComment', auth, async (req, res) => {
    try {
        let comment = req.body;
        comment.userName = req.user.name
        await Comment.create({userName: comment.userName, itemId: comment.itemId, commentText: comment.commentText})
        emitter.emit('newMessage', comment)
        res.status(200)

    } catch (e) {
        console.log(e)
    }
})

module.exports = router

