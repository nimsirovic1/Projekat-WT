const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const student = sequelize.define("student",{
       // id,
        imePrezime : {
            type:Sequelize.STRING,
            unique: true
        },
        index : Sequelize.STRING
       
    })
    return student;
};

