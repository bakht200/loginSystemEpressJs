
module.exports=(sequelize,DataTypes)=>{
    const User = sequelize.define("user",{
       first_name: {
        type: DataTypes.STRING
        
      },
      last_name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        
      },
      password: {
        type: DataTypes.STRING
      },
     
    
    })
    return User;
}



  