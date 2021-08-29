const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const config = require('config')
router.post('/register',
    [
        check('email', 'Invalid email').isEmail()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }
            const {name, email, password} = req.body;
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return res.status(400).json({message: 'User with this email already exists'})
            }
            const hashedPassword = await bcrypt.hash(password, 11);
            await User.create({name: name, email: email, password: hashedPassword})
            res.status(201).json({message: 'User created'})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    })

router.post('/login', [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Password not entered').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(400).json({message: 'User is not found'})
        }
        const isMath = await bcrypt.compare(password, user.password)
        if (!isMath) {
            return res.status(400).json({message: 'Wrong password'})
        }
        const token = jwt.sign(
            {userId: user.id, role: user.role, name: user.name},
            config.get('jwtSecret'),
            {expiresIn: '24h'}
        )
        res.json({token, userID: user.id, role: user.role})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router