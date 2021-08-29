const {Router} = require('express')
const router = Router()
const {Tag} = require('../models/models')
const {v4: uuidv4} = require('uuid');

router.post('/addTag', async (req, res) => {
    try {
        const {text, itemId} = req.body
        const id = uuidv4()
        await Tag.create({id, text, itemId})
        res.status(201).json({message: 'Tag added'})
    } catch (e) {
        console.log(e)
    }
})
router.get('/getTags', async (req, res) => {
    try {
        const tags = await Tag.findAll()
        const tagsInd = tags.map((e) => {
            return e.text
        })
        const filteredTags = tags.filter((tag, index) => tagsInd.indexOf(tag.text) === index);
        res.json(filteredTags)
    } catch (e) {
        console.log(e)
    }
})
router.post('/delTag', async (req, res) => {
    try {
        const {text, itemId} = req.body
        await Tag.destroy({where: {text, itemId}})
        res.status(201).json({message: 'Tag removed'})
    } catch (e) {
        console.log(e)
    }
})

module.exports = router

