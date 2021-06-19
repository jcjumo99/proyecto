const userControllers = {};
const mysql = require('../config/database');
const bcrypt = require('bcrypt');

userControllers.signin = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    mysql.query(sql, email, async (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            const data = result[0];
            if(data === undefined){
                res.json({ status: 'error', message: 'Email not found' });
            }else{
                const hash = data.password;
                const compare = await bcrypt.compare(password, hash);
                if(compare){
                    const users = {
                        userId : data.userId,
                        profileId : data.profile,
                        email : data.email
                    };
                    res.json({ status: 'success', message: 'Login successfully', data: users });
                }else{
                    res.json({ status: 'error', message: 'Password incorrect' });
                }
            }
        }
    });
}

userControllers.signup = async (req, res) => {
    const { email, password } = req.body;
    const sql_email = "SELECT * FROM users WHERE email = ?";
    mysql.query(sql_email, email, async (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            const data = result[0];
            if(data === undefined){
                const sql = "INSERT INTO users (email, password, profile) VALUES (?, ?, '2')";
                const hash = await bcrypt.hash(password, 10);
                const data = [email, hash];
                mysql.query(sql, data, async (err, result) => {
                    if(err){
                        res.json({ status: 'error', message: 'Error in the database: '+err });
                    }else{
                        res.json({ status: 'success', message: 'User created successfully' });
                    }
                });
            }else{
                res.json({ status: 'success', message: 'Email in use' });
            }
        }
    });
}

userControllers.getUsers = async (req, res) => {
    const sql = "SELECT * FROM users ORDER BY userId DESC ";
    mysql.query(sql, (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            res.json({ status: 'success', message: 'Query successfully', data: result });
        }
    });
}

userControllers.getUser = async (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * FROM users WHERE userId = ?";
    mysql.query(sql, userId, (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            res.json({ status: 'success', message: 'Query successfully', data: result });
        }
    })
}

userControllers.createUser = async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;
    const sql = "INSERT INTO users (first_name, last_name, email, phone, password, profile) VALUES(?,?,?,?,?, 2)";
    const data = [first_name, last_name, email, phone, password];
    mysql.query(sql, data, (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            res.json({ status: 'success', message: 'User created successfully' });
        }
    });
}

userControllers.updateUser = async (req, res) => {
    const { userId, first_name, last_name, email, phone } = req.body;
    const sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE userId = ?";
    const data = [first_name, last_name, email, phone, userId];
    mysql.query(sql, data, (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            res.json({ status: 'success', message: 'User update successfully' });
        }
    });
}

userControllers.deleteUser = async (req, res) => {
    const { userId } = req.params;
    const sql = "DELETE FROM users WHERE userId = ?";
    mysql.query(sql, userId, (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            res.json({ status: 'success', message: 'User update successfully' });
        }
    });
}

userControllers.ordenClient = async (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT SUBSTRING_INDEX(US.code,'-',-1) AS code, US.state, US.monto FROM userservices US INNER JOIN users U ON U.userId = US.userId INNER JOIN services S ON S.servicesId = US.servicesId WHERE U.userId = ?  GROUP BY US.code; ";
    mysql.query(sql, userId, (err, result) => {
        if(err){
            res.json({ status: 'error', message: 'Error in the database: '+err });
        }else{
            res.json({ status: 'success', message: 'Query successfully', data: result });
        }
    });
}

module.exports = userControllers;