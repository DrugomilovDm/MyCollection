const {Router} = require('express')
const router = Router()
const {Collection, Item,Tag,Like} = require('../models/models')
const auth = require('../middleware/auth.middleware')
const {imgUpload} = require("../utils/imgUpload");
router.post("/addCol", auth, async (req, res) => {
    try {
        const {title, category, shortDesc} = req.body
        const col = await Collection.findOne({where: {title}})
        if (!!col) {
            return res.status(400).json({message: 'Коллекция с таким названием уже существует'})
        }
        if (req.files) {
            const {img} = req.files
            const uploadedResponse= await imgUpload(img)
            await Collection.create({img: uploadedResponse.url, title, category, shortDesc, userId: req.user.userId})
            return res.status(201).json({message: 'Коллекция создана'})
        }
        await Collection.create({title, category, shortDesc, userId: req.user.userId})
        res.status(201).json({message: 'Коллекция создана'})
    } catch (e) {
        console.log(e)
    }

})

router.get("/getLargestCols", async (req, res) => {
    try {
        const cols = await Collection.findAll({include: Item})
        cols.sort((a, b) => {
            return a.items.length - b.items.length
        })
        cols.splice(0, cols.length - 3)
        cols.reverse()
        res.json(cols)
    } catch (e) {
        console.log(e)
    }
})

router.get("/getCol", async (req, res) => {
    try {
        const id = req.query.id
        const cols = await Collection.findOne({where: {id}})
        res.json(cols)
    } catch (e) {
        console.log(e)
    }
})

router.get("/getMyCol", auth, async (req, res) => {
    try {
        const cols = await Collection.findAll({where: {userId: req.user.userId}})
        res.json(cols)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delCol', auth, async (req, res) => {
    try {
        const {id} = req.body
        const col =(req.user.role==="ADMIN")?await Collection.findOne({where: {id},include:Item}):
            await Collection.findOne({where: {id, userId: req.user.userId},include:Item});
        await col.items.forEach((item)=>{Tag.destroy({where:{itemId:item.id}});Like.destroy({where:{itemId:item.id}})})
        await Item.destroy({where: {collectionId: col.id}})
        await Collection.destroy({where: {id: col.id}})
        res.status(200).json({message: "Коллекция удалена"})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post("/changeCol", auth, async (req, res) => {
    try {
        const {title, category, shortDesc,id} = req.body
        if (req.files) {
            const {img} = req.files
            const uploadedResponse= await imgUpload(img)
            await Collection.update({img: uploadedResponse.url, title, category, shortDesc},{where:{id:id}})
            return res.status(201).json({message: 'Данные коллекции обновлены'})
        }
        await Collection.update({title, category, shortDesc},{where:{id:id}})
        res.status(201).json({message: 'Данные коллекции обновлены'})
    } catch (e) {
        console.log(e)
    }

})
module.exports = router