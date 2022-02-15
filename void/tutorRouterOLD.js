import express from 'express'

const tutorRouter = express.Router();

tutorRouter.post('/api/tutor/new', async (req, res) => {
  let body = req.body;

  console.log('***debug::tutorRouter*** /api/tutor/new');
  console.log('firstname: ' + body.firstname);
  console.log('lastname: ' + body.lastname);
  console.log('program:' + body.program);
  console.log('speciality:' + body.speciality);
  console.log('username: ' + body.email);
  console.log('password: ' + body.password);
  
  // Define query to look for email address of student
  let dbStatement = 'INSERT INTO tutor '
    + '(fname, lname, username, password, emailaddress, location, program, speciality) ' 
    + "VALUES ('" 
      + body.firstname + "', '" 
      + body.lastname + "', '" 
      + body.email + "', '"
      + body.password + "', '"
      + body.email + "', '"
      + body.location + "', '"
      + body.program + "', '"
      + body.speciality + "')";


console.log('dbStatement is ' + dbStatement);

db.query(dbStatement, (err, result) => {
  console.log("***debug*** dbquery is being executed");

  if (err) {
      console.log("***debug*** dbquery execution fails");
      return res.status(500).send(err);
  }
  console.log("***debug*** dbquery executes successfully");

//  res.redirect('/');
return res.status(200);




});


// //create tutor 
// tutorRouter.post('/api/tutor/new', async (req, res) => {
//     let body = req.body
//     let sql = 'SELECT * FROM tutor WHERE tutorid = ?';
//     let tutor = await db.query(sql, body.tutorid);

//     if (tutor.length !== 0) {
//         sql = 
//         'INSERT INTO tutor (tutorid, username, password, fname, lname, location, speciality, program, tutoravailabilitystatus, profilepicture, criminalrecord, emailaddress, language) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
//         let param = [
//             body.tutorid, 
//             body.username, 
//             body.password, 
//             body.fname, 
//             body.lname, 
//             body.location, 
//             body.speciality, 
//             body.program, 
//             body.tutoravailabilitystatus, 
//             body.profilepicture, 
//             body.criminalrecord, 
//             body.emailaddress, 
//             body.language 
//         ];
//         await db.query(sql, param);
//         return res.status(201).send({ message: 'Tutor successfully created' })
//     } else {
//         return res.status(400).send({message: 'Tutor already exists'})
//     }
// });


// tutor login
tutorRouter.post("/api/tutor/login", async (req, res) => {
  let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		db.query('SELECT * FROM tutor WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				
				res.send('welcome !');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

// Read all tutor
tutorRouter.get('/api/tutor/all', async (req, res) => {
    let sql = 'SELECT * FROM tutor';
    
    db.query(sql, function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.status(200).send(results);
      }
    });
  });
});

module.exports = tutorRouter;