const {Router} = require('express')
const router = Router()
const {Item, Collection, Tag, Like} = require('../models/models')
const auth = require('../middleware/auth.middleware')
const {imgUpload} = require("../utils/imgUpload");
const sequelize = require('sequelize')

router.post("/addItem", auth, async (req, res) => {
    try {
        const {name, tags, collectionId} = req.body
        const col = await Collection.findOne({where: {id: collectionId}})
        if (col.userId === req.user.userId || req.user.role === "ADMIN") {
            if (req.files) {
                const {img} = req.files
                const uploadedResponse = await imgUpload(img)
                await Item.create({img: uploadedResponse.url, name, tags, collectionId, userId: col.userId})
                return res.status(201).json({message: 'Item created'})
            }
            await Item.create({name, tags, collectionId, userId: col.userId})
            return res.status(201).json({message: 'Item created'})
        }
        res.status(400).json({message: 'No access'})
    } catch (e) {
        console.log(e)
    }
})

router.get("/getLastItems", async (req, res) => {
    try {
        const items = await Item.findAll()
        items.splice(0, items.length - 9)
        res.json(items.reverse())
    } catch (e) {
        console.log(e)
    }
})

router.get("/getItems", async (req, res) => {
    try {
        const collectionId = req.query.id
        if (collectionId) {
            const items = await Item.findAll({where: {collectionId}, include: Like})
            return res.json(items)
        }
        const value = req.query.value
        const items = await Item.findAll({
            include: [Tag, Collection], where: {
                [sequelize.Op.or]: [
                    {name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + value + '%')},
                    {text: sequelize.where(sequelize.fn('LOWER', sequelize.col('text')), 'LIKE', '%' + value + '%')},
                    {shortDesc: sequelize.where(sequelize.fn('LOWER', sequelize.col('shortDesc')), 'LIKE', '%' + value + '%')},
                    {title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + value + '%')},
                ]
            }
        })
        res.json(items)
    } catch (e) {
        console.log(e)
    }
})
router.get("/getItem", async (req, res) => {
    try {
        const id = req.query.id
        const item = await Item.findOne({where: {id}, include: [Tag, Like]})
        res.json(item)
    } catch (e) {
        console.log(e)
    }
})
router.delete('/delItem', auth, async (req, res) => {
    try {
        const {id} = req.body;
        const item = Item.findOne({where: {id, userId: req.user.userId}})
        if (item || req.user.role === "ADMIN") {
            await Item.destroy({where: {id}})
            return res.status(200).json({message: "Item deleted"})
        }
        res.json({message:'No access'})
    } catch (e) {
        res.status(500).json({message:'Something went wrong'})
    }
})
router.post("/changeItem", auth, async (req, res) => {
    try {
        const {name, id} = req.body
        if (req.files) {
            const {img} = req.files
            const uploadedResponse = await imgUpload(img)
            await Item.update({img: uploadedResponse.url, name}, {where: {id: id}})
            return res.status(201).json({message: 'Item data updated'})
        }
        await Item.update({name: name}, {where: {id: id}})
        res.status(201).json({message: 'Item data updated'})
    } catch (e) {
        console.log(e)
    }

})
module.exports = router