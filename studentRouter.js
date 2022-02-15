import express, { query } from 'express';
import db from './db';

const studentRouter = express.Router();

//Student Signup 
studentRouter.post('/api/student/new', async (req, res) => {
  let body = req.body;

  console.log('***debug::studentRouter*** /api/student/new');
  console.log('firstname: ' + body.firstname);
  console.log('lastname: ' + body.lastname);
  console.log('dateofbirth:' + body.dateofbirth);
  console.log('username: ' + body.email);
  console.log('password: ' + body.password);
  
  let dbStatement = 'INSERT INTO student '
    + '(fname, lname, username, password, emailaddress, DOB, location, school_program) ' 
    + "VALUES ('" 
      + body.firstname + "', '" 
      + body.lastname + "', '" 
      + body.email + "', '"
      + body.password + "', '"
      + body.email + "', '"
      + body.dateofbirth + "', '"
      + body.location + "', '"
      + body.schoolprogram + "')";


console.log('dbStatement is ' + dbStatement);

db.query(dbStatement, (err, result) => {
  console.log("***debug*** dbquery is being executed");

  if (err) {
      console.log("***debug*** dbquery execution fails");
      return res.status(500).send(err);
  }
  console.log("***debug*** dbquery executes successfully");

    //  res.redirect('/');
  return res.status(200).send(body);

  });

});

// Student Log In
studentRouter.post("/api/student/login", async (req, res) => {
  console.log('***debug::studentRouter *** api/student/login');
  let username = req.body.email;
  let password = req.body.password;
  console.log('***debug*** username is ' + username);
  console.log('***debug*** password is ' + password);
	if (username && password) {
    db.query('SELECT * FROM student WHERE username = ? AND password = ?', 
      [username, password], 
      function(error, results, fields)
      {
      console.log('***debug*** dbquery is executed');
      console.log('***debug*** result.length is ' + results.length);
        
      if (results.length > 0) {
        
        // Let's examine the result from db query
        console.log('***debug*** results[0].fname is ' + results[0].fname);

        results[0].firstname = results[0].fname;
        results[0].lastname = results[0].lname;
        results[0].dateofbirth = results[0].DOB;
        results[0].email = results[0].emailaddress;
        results[0].schoolprogram = results[0].school_program;
        
        //res.send('welcome !');
        res.status(200).send(results[0]);
			} else {
        
        // res.send('Incorrect Username and/or Password!');
        
        //res.status(404).send("{'status':'404', 'message':'Incorrect username or password'}");

        res.status(401).json({
          message: 'incorrect username or password'
      });


			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


//update student
studentRouter.patch('/api/student/update', async (req, res) => {
  let body = req.body;
  let sql = 'SELECT * FROM student WHERE studentid = ?';

  // Look for id of student in database
  await db.query(sql, body.studentid, async function (error, results) {
    if (error) throw error;
    // If there is a result, the student exists (update)
    if (results.length > 0) {
      // Do something
      // Else (if the id is not found in the database), the student doesn't exist

      sql =
        'UPDATE student SET fname = ?, lname = ?, location = ?, DOB = ?, school_program = ?, profilepicture = ?, emailaddress = ? WHERE studentid = ?';
      let param = [
        body.fname,
        body.lname,
        body.location,
        body.DOB,
        body.school_program,
        body.profilepicture,
        body.emailaddress,
        body.studentid
      ];
      await db.query(sql, param);
      return res.status(200).send({ message: 'Student successfully updated' });

    } else {
      return res.status(404).send({ message: 'Student Not found' });
    }
  });
});

//delete student
studentRouter.delete('/api/student/delete', async (req, res) => {
  let sql = 'SELECT * FROM student WHERE studentid = ?';
  await db.query(sql, req.body.studentid, async function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      sql = 'DELETE FROM student WHERE studentid = ?';
      await db.query(sql, req.body.studentid);
      return res.status(200).send({ message: 'Student successfully deleted' });
    } else {
      return res.status(404).send({ message: 'Student not found' });
    }
  });
})


// Read all students
studentRouter.get('/api/student/all', async (req, res) => {
  let sql = 'SELECT * FROM student';

  db.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = studentRouter;