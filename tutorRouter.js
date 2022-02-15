import express from 'express'

const tutorRouter = express.Router();

// Create Tutor
 
tutorRouter.post('/api/tutor/new', async (req, res) => {
  let body = req.body;

  console.log('***debug::tutorRouter*** /api/tutor/new');
  console.log('firstname: ' + body.firstname);
  console.log('lastname: ' + body.lastname);
  console.log('program:' + body.program);
  console.log('speciality:' + body.speciality);
  console.log('username: ' + body.email);
  console.log('password: ' + body.password);
  
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
  return res.status(200).send(body);

    });

  });



// tutor login

tutorRouter.post("/api/tutor/login", async (req, res) => {
  console.log('***debug::tutorRouter *** api/tutor/login');
  let username = req.body.email;
  let password = req.body.password;
  console.log('***debug*** username is ' + username);
  console.log('***debug*** password is ' + password);
	if (username && password) {
    db.query('SELECT * FROM tutor WHERE username = ? AND password = ?', 
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
        results[0].email = results[0].emailaddress;
        results[0].program = results[0].program;
        results[0].speciality= results[0].speciality;
        
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


// update tutor

tutorRouter.patch('/api/tutor/update', async (req, res) => {
  let body = req.body;

  let sql = 'SELECT * FROM tutor WHERE tutorid = ?';

  // Look for id of tutor in database
  await db.query(sql, body.tutorid, async function (error, results) {
    if (error) throw error;
    // If there is a result, the tutor exists (update)
    if (results.length > 0) {
      // Do something
      // Else (if the id is not found in the database), the tutor doesn't exist

      sql =
        'UPDATE tutor SET fname = ?, lname = ?, location = ?, speciality = ?, program = ?, tutoravailabilitystatus = ?, profilepicture = ?, criminalrecord = ?, emailaddress = ?, language = ? WHERE tutorid = ?';
      let param = [
        body.fname,
        body.lname,
        body.location,
        body.speciality,
        body.program,
        body.tutoravailabilitystatus,
        body.profilepicture,
        body.criminalrecord,
        body.emailaddress,
        body.language,
        body.tutorid
      ];
      await db.query(sql, param);
      return res.status(200).send({ message: 'Tutor successfully updated' });

    } else {
      return res.status(404).send({ message: 'Tutor Not found' });
    }
  });
});

//delete tutor
tutorRouter.delete('/api/tutor/delete', async (req, res) => {
  let sql = 'SELECT * FROM tutor WHERE tutorid = ?';
  await db.query(sql, req.body.tutorid, async function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      sql = 'DELETE FROM tutor WHERE tutorid = ?';
      await db.query(sql, req.body.tutorid);
      return res.status(200).send({ message: 'Tutor successfully deleted' });
    } else {
      return res.status(404).send({ message: 'Tutor not found' });
    }
  });
})



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


module.exports = tutorRouter;
