const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'carmen_carmencita'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log('Error in the database: ' + err);
    } else {
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection;