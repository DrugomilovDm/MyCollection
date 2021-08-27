const {INTEGER,STRING,BOOLEAN} =require('sequelize')
const sequelize=require('../db')

const User=sequelize.define('user',{
    id:{allowNull:false, autoIncrement:true, primaryKey:true, type:INTEGER},
    name:{type:STRING},
    email:{type:STRING, unique:true},
    password:{type:STRING},
    role:{type:STRING,defaultValue:"USER"}
})

const Collection=sequelize.define('collection',{
    id:{allowNull:false, autoIncrement:true, primaryKey:true, type:INTEGER},
    title:{type:STRING,allowNull:false},
    category:{type:STRING,allowNull:false},
    shortDesc:{type:STRING},
    img:{type:STRING},
})

const Item=sequelize.define('item',{
    id:{allowNull:false, autoIncrement:true, primaryKey:true, type:INTEGER},
    name:{type:STRING,allowNull:false},
    rate:{type:INTEGER,defaultValue: 0},
    img:{type:STRING},
})

const Like=sequelize.define('like',{
    id:{allowNull:false, autoIncrement:true, primaryKey:true, type:INTEGER},
})

const Tag=sequelize.define('tag',{
    id:{type:STRING,allowNull:false,primaryKey:true},
    text:{type:STRING,allowNull:false}
})

const Comment=sequelize.define('comment',{
    id:{allowNull:false, autoIncrement:true, primaryKey:true, type:INTEGER},
    userName:{type:STRING,allowNull:false},
    commentText:{type:STRING,allowNull:false}
})

User.hasMany(Collection)
Collection.belongsTo(User)
User.hasMany(Item)
Item.belongsTo(User)
Collection.hasMany(Item)
Item.belongsTo(Collection)
User.hasMany(Like)
Like.belongsTo(User)
Item.hasMany(Like)
Like.belongsTo(Item)
Item.hasMany(Tag)
Tag.belongsTo(Item)
Item.hasMany(Comment)
Comment.belongsTo(Item)

module.exports={User,Collection,Item,Like,Tag,Comment}
