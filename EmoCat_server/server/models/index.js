var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env].db;
config.logging = console.log;
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};


fs.readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function(file){
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

//DB init.
// var modelProto = ['board.js', 'board_post.js', 'board_attachment.js', 'classes_lecture.js', 'dept.js', 'professor.js', 'subjects.js', 'subscribe.js', 'system.js', 'system_lecture.js', 'timemodel.js'];
// modelProto.forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
// });

Object.keys(db).forEach(function(modelName){
    if ("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
