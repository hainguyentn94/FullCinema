var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var Schedule = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        Schedule = sequelize.define('Schedule', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            duration: Sequelize.INTEGER,
            time: Sequelize.DATE,
            idroom: Sequelize.BIGINT,
            idmovie:Sequelize.BIGINT,
            idticket:Sequelize.BIGINT,
            status:Sequelize.INTEGER
            });
        Schedule.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}
module.exports.create = function(duration,time,idroom,idmovie,idticket, callback) {
    Schedule.create({
        id: '',
        duration:duration,
        time:time,
        idroom:idroom,
        idmovie:idmovie,
        idticket:idticket,
        status:"1"
    }).then(function(schdule) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id,duration,time,idroom,idmovie,idticket,status, callback) {
    Schedule.find({where: {id: id}}).then(function(schdule) {
        Schedule.updateAttributes({
            id: id,
            duration:duration,
            time:time,
            idroom:idroom,
            idmovie:idmovie,
            idticket:idticket,
            status:status
        }).then(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}
exports.read = function(id, callback) {
    Schedule.find({ where:{ id: id} }).then(function(schdule) {
        if(!schdule) {
            callback(null);
        } else {
            callback({
                id: schdule.id,
                duration:schdule.duration,
                time:schdule.time,
                idroom:schdule.idroom,
                idmovie:schdule.idmovie,
                idticket:schdule.idticket,
                status:schdule.status
            });
        }
    });
}
exports.getAllSchedule = function(callback) { 
    Schedule.findAll({where:{status: 1}}).then(function(schedules) {
        var roomList = []; 
        schedules.forEach(function(schedule) { 
            scheduleList.push({
                id: schdule.id,
                duration:schdule.duration,
                time:schdule.time,
                idroom:schdule.idroom,
                idmovie:schdule.idmovie,
                idticket:schdule.idticket,
                status:schdule.status
            }); 
        });
        
        callback(null, scheduleList);
    });
}
exports.destroy = function(id, callback) {
    Schedule.find({ where:{ id: id} }).then(function(schdule) {
        schdule.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
