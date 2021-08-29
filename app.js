const express = require('express')
const sequelize = require('./db')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 80

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'files')))
app.use(express.urlencoded({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/col', require('./routes/collection.routes'))
app.use('/api/item', require('./routes/item.routes'))
app.use('/api/tag', require('./routes/tag.routes'))
app.use('/api/like', require('./routes/like.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/comments', require('./routes/comments.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'front/build')))
    app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'front/build', 'index.html'));
        }
    )
}

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log('App has been started on port ' + PORT))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1);
    }
}

start();