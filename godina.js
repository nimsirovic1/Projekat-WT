const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const godina = sequelize.define("godina",{
      //  id,
        naziv : {
            type: Sequelize.STRING,
            unique: true
        },
        nazivRepSpi : Sequelize.STRING,
        nazivRepVje : Sequelize.STRING,
    })
    return godina;
};