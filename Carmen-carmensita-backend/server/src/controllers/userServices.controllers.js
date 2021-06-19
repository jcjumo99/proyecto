const userServicesControllers = {};
const { randomNumber } = require('../lib/random');
const mysql = require('../config/database');
const userControllers = require('./user.controllers');

userServicesControllers.addUserServices = async (req, res) => {
    const { userId, address, detail, type_delivery, monto } = req.body;
    const hash = randomNumber() + '-' + Date.now();
    const services = req.body.services;
    for( let i = 0; i < services.length; i++ ){
        const sql = "INSERT INTO userservices (userId, servicesId, code, address, detail, monto, type_delivery, date_start, state) VALUES (?,?,?,?,?,?,?, NOW(),?)";
        const servicesId = services[i].cesta;
        const data = [userId, servicesId, hash, address, detail, monto, type_delivery, '1'];
        mysql.query(sql, data, (err, result) => {
            if(err){
                console.log(err);
                //res.json({ status: 'error', message: 'Error in the database: '+err });
            }else{
                console.log('Success');
            }
        });
    }
    res.json({ status: 'success', message: 'User services successfully', code_services : hash });
}

userServicesControllers.getUserServices = async (req, res) => {
    const sql = "SELECT S.userId, S.servicesId, SUBSTRING_INDEX(S.code,'-',-1) AS code, S.code AS code_complete, S.address, S.detail, S.type_delivery, DATE_FORMAT(S.date_start, \"%Y-%m-%d\") AS date_start, S.state, S.deliveryId, U.first_name, U.last_name, U.email FROM\n" +
        "userservices S \n" +
        "INNER JOIN users U ON U.userId = S.userId\n" +
        "GROUP BY code;";
    mysql.query(sql, (err, result) => {
        if(err){
            res.json({ status : "error", message : "Error in the query: "+err });
        }else{
            res.json({ status: 'success', message: 'Query successfully', data: result });
        }
    });
}

userServicesControllers.updateState = async (req, res) => {
    const { code, state } = req.body;
    const sql = "UPDATE userservices SET state = ? WHERE code = ?  ";
    const data = [ state, code ];
    mysql.query(sql, data, (err, result) => {
        if(err){
            res.json({ status : "error", message : "Error in the query: "+err });
        }else{
            res.json({ status: 'success', message: 'Update state' });
        }
    });
}

userServicesControllers.getServicesCode = async (req, res) => {
    const sql = "SELECT U.first_name, U.last_name, U.phone, US.address, US.detail, S.title FROM userservices US INNER JOIN users U ON U.userId = US.userId INNER JOIN services S ON S.servicesId = US.servicesId WHERE US.code = ?;";
    const { code } = req.body;
    mysql.query(sql, code, (err, result) => {
        if(err){
            res.json({ status : "error", message : "Error in the query: "+err });
        }else{
            res.json({ status: 'success', message: 'Query', data: result });
        }
    })
}

module.exports = userServicesControllers;