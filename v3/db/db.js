var  Sequelize = require('sequelize');
var path = require('path');

var config = require(path.join(appRoot,"app_config.js"));

var sequelize = null;

     function Db() {}

         Db.getDbInstance =function () {
             if(!Sequelize){
              sequelize = new Sequelize(config.database, config.userName, config.password, config);
             }
             return sequelize;

         };

Db.sequelize = sequelize;
Db.Sequelize = Sequelize;

module.exports = Db;
