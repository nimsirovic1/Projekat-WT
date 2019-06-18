const Sequelize = require("sequelize");
const sequelize = new Sequelize('wt2018', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.student = sequelize.import(__dirname+'/student.js');
db.godina = sequelize.import(__dirname+'/godina.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

// relacije
// student -- više na jedan -- godina, fk studentGod, as studenti
db.godina.hasMany(db.student,{as:'studenti',foreignKey:'studentGod'});

// godina -- više na više -- vjezba, mt godina_vjezba, fk idgodina i idvjezba, as godine i vjezbe
db.godinaVjezba = db.vjezba.belongsToMany(db.godina,{as:'godine',through:'godina_vjezba',foreignKey:'idvjezba'});
db.godina.belongsToMany(db.vjezba, {as:'vjezbe',through:'godina_vjezba',foreignKey:'idgodina'});

// vjezba -- više na više -- zadatak, mt vjezba_zadatak, fk idvjezba i idzadatak, as vjezbe i zadaci
db.vjezbaZadatak = db.zadatak.belongsToMany(db.vjezba,{as:'vjezbe',through:'vjezba_zadatak',foreignKey:'idzadatak'});
db.vjezba.belongsToMany(db.vjezba, {as:'zadaci',through:'vjezba_zadatak',foreignKey:'idvjezba'});

module.exports=db;