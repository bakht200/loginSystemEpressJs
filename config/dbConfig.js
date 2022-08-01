module.exports ={
    host:'127.0.0.1',
    user:'root',
    password:'12345678',
    db:'loginSystem',
    dialect:'mysql',

    pool :{
        max:5,
        min:0,
        acquire:30000
    }
}