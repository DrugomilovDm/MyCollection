const {Router}=require('express')
const auth  =require('../middleware/auth.middleware')
const {Like} = require("../models/models");
const  router = Router()

router.post('/addLike',auth,async (req,res)=>{
    try{
        const {itemId}=req.body
        console.log('userId:'+req.user.userId)
        await Like.create({itemId,userId:req.user.userId})
        res.status(201).json({message: 'Like добавлен'})
    }catch (e){res.json({message:e})}
})

router.delete('/delLike',auth,async (req,res)=>{
    try{
        const {itemId}=req.body
        await Like.destroy({where:{itemId,userId:req.user.userId}})
        res.status(201).json({message: 'Like убран'})
    }catch (e){res.json({message:e})}
})

module.exports=router