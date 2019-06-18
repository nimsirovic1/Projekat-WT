const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const vjezba = sequelize.define("vjezba",{
      //  id,
        naziv : {
            type: Sequelize.STRING,
            unique: true
        },
        spirala : Sequelize.BOOLEAN

    })
    return vjezba;
};

