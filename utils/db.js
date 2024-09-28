const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'bank-db.cnuack06gmry.ap-south-1.rds.amazonaws.com', // RDS endpoint
    user: 'admin',
    password: '5B2mi7PpPNqrGr3rYdsP',
    database: 'bank_app',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the RDS database!');
});

module.exports = db;
