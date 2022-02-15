/*

  // Look for email address of student in database
  await db.query(emailQuery, body.emailaddress, async function(error, results) {
  
    if (error) throw error
    // If there is a result, the student already exists (dont'write it in the database)
    if (results.length > 0) {
      res.send({message: 'Student already in database'})
    // Else (if the email is not found in the database), proceed with writing the student in the database
    } else {
      let createStudentQuery =
      'INSERT INTO student (studentid, username, password, fname, lname, location, DOB, school_program,profilepicture, emailaddress) VALUES (?,?,?,?,?,?,?,?,?,?)';
    let param = [
      body.studentid,
      body.username,
      body.password,
      body.fname,
      body.lname,
      body.location,
      body.DOB,
      body.school_program,
      body.profilepicture,
      body.emailaddress
    ];

    await db.query(createStudentQuery, param);
    return res.status(201).send({ message: 'Student successfully created' });
    }
  });
}
*/