const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const config = require('config')
router.post('/register',
    [
        check('email', 'Некорректный email').isEmail()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const {name, email, password} = req.body;
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(password, 11);
            await User.create({name: name, email: email, password: hashedPassword})
            res.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    })

router.post('/login', [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }
        const isMath = await bcrypt.compare(password, user.password)
        if (!isMath) {
            return res.status(400).json({message: 'Неверный пароль'})
        }
        const token = jwt.sign(
            {userId: user.id, role: user.role, name: user.name},
            config.get('jwtSecret'),
            {expiresIn: '24h'}
        )
        res.json({token, userID: user.id, role: user.role})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router