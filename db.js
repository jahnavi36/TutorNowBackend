import mysql from "mysql";

console.log('***debug*** createConnection() begin')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nodeclient',
    password: '123456',
    database: 'tutorapp',
    port: 3600

 });

// open the MYSQL connection
console.log('***debug*** creationConnection() end')
db.connect( err => {
    if (err) throw err;
});
console.log('***debug*** creationConnection() OK')
export default db;
