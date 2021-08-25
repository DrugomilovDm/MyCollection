const {Sequelize}=require('sequelize')

module.exports= new Sequelize(
    ,,,{
        dialect:'mysql',
        port:3306,
        host:"remotemysql.com"
    }
)
