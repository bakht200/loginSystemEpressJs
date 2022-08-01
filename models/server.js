const dbConfig = require("../config/dbConfig.js");

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect:dbConfig.dialect,
        pool :{
           max: dbConfig.pool.max,
           min: dbConfig.pool.min,
           acquire: dbConfig.pool.acquire,
        }
    });

sequelize.authenticate().then(()=>{
    console.log('Connected Successfully');
}).catch(error =>{
    console.log('Error',error);
})

const db={}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.userModel = require('./userModel.js')(sequelize,DataTypes);
// db.reviews = require('./reviewModel.js')(sequelize,DataTypes);
// db.users = require('./userModel.js')(sequelize,DataTypes);


db.sequelize.sync({force:false}).then(()=>{
    console.log('yess re-sync done!')
})

module.exports = db