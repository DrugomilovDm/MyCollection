const {Router} = require('express')
const router = Router()
const {User} = require('../models/models')
const auth = require('../middleware/auth.middleware')

router.get('/getUsers', auth, async (req, res) => {
    try {
        if (req.user.role === "ADMIN") {
            const users = await User.findAll()
            return res.json(users)
        }
        res.json({message:'No access'})
    } catch (e) {
        console.log(e)
    }
})
router.delete('/delUsers', auth, async (req, res) => {
    try {
        if (req.user.role === "ADMIN") {
            const {ids} = req.body
            await User.destroy({where: {id: ids}})
            return res.json({message: 'User deleted'})
        }
        res.json({message: 'No access'})
    } catch (e) {
        console.log(e)
    }
})

router.post('/addAdmin', auth, async (req, res) => {
    try {
        if (req.user.role === "ADMIN") {
            const {ids} = req.body
            await User.update({role: "ADMIN"}, {where: {id: ids}})
            return res.json({message: 'User role has changed'})
        }
        res.json({message: 'No access'})
    } catch (e) {
        console.log(e)
    }
})
router.post('/deleteAdmin', auth, async (req, res) => {
    try {
        if (req.user.role === "ADMIN") {
            const {ids} = req.body
            await User.update({role: "USER"}, {where: {id: ids}})
            return res.json({message: 'User role has changed'})
        }
        res.json({message: 'No access'})
    } catch (e) {
        console.log(e)
    }
})

module.exports = router