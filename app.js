const express = require('express');
const sql = require('mysql');
const app = express();
const studentRouter = require('./src/studentRouter');
const tutorRouter = require('./src/tutorRouter');
const tutorSessionRouter = require('./src/tutorSessionRouter');

require('dotenv').config();

// Set server port
const PORT = process.env.PORT || 3001;

var cors = require('cors')

// app.use(bodyParser.urlencoded({extended: true}));

// app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Prefer");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
	next();
});

// Apply middleware
app.use(express.json());
app.use(studentRouter);
app.use(tutorRouter);
app.use(tutorSessionRouter);


// Configure database
console.log('***debug::app.js*** createConnection() begin')
const db = sql.createConnection({
  host: 'localhost',
  user: 'nodeclient',
  password: '123456',
  database: 'tutorapp',
  port: 3600
});
console.log('***debug::app.js*** createConnection() end')

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});
global.db = db; // Allows to use db connection in other files without importing it

app.listen(PORT, () => console.log(`App listening on ${PORT}`));