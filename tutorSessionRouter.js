import express from 'express';

const tutorSessionRouter = express.Router();

//create tutorSession

tutorSessionRouter.post('/api/tutorsession/new', async (req, res) => {
  let body = req.body;

  let createTutorSessionQuery =
    'INSERT INTO tutorsession (tutorsessionid, subject, topic, context, tasksalreadycompleted, questionstobeanswered, expectedduration, language, requestorid, sessionstatus) VALUES (?,?,?,?,?,?,?,?,?,?)';
  let param = [
    body.tutorsessionid,
    body.subject,
    body.topic,
    body.context,
    body.tasksalreadycompleted,
    body.questionstobeanswered,
    body.expectedduration,
    body.language,
    body.requestorid,
    body.sessionstatus
  ];

  await db.query(createTutorSessionQuery, param);
  return res
    .status(201)
    .send({ message: 'Tutor Session successfully created' });
});

//update tutor session
tutorSessionRouter.patch('/api/tutorsession/update', async (req, res) => {
  let body = req.body;
  let sql = 'SELECT * FROM tutorsession WHERE tutorsessionid = ?';

  // Look for id of student in database
  await db.query(sql, body.tutorsessionid, async function (error, results) {
    if (error) throw error;
    // If there is a result, the student exists (update)
    if (results.length > 0) {
      // Do something
      // Else (if the id is not found in the database), the student doesn't exist

      sql =
        'UPDATE tutorsession SET tutorsessionid = ?, subject = ?, topic = ?, context = ?, tasksalreadycompleted = ?, questionstobeanswered = ?, expectedduration = ?, language = ?, requestorid = ?, sessionstatus = ? WHERE tutorsessionid = ?';
      let param = [
        body.tutorsessionid,
        body.subject,
        body.topic,
        body.context,
        body.tasksalreadycompleted,
        body.questionstobeanswered,
        body.expectedduration,
        body.language,
        body.requestorid,
        body.sessionstatus,
        body.tutorsessionid
      ];
      await db.query(sql, param);
      return res
        .status(200)
        .send({ message: 'Tutor Session successfully updated' });
    } else {
      return res.status(404).send({ message: 'Tutor Session Not found' });
    }
  });
});


//delete tutorsession
tutorSessionRouter.delete('/api/tutorsession/delete', async (req, res) => {
  let sql = 'SELECT * FROM tutorsession WHERE tutorsessionid = ?';
  await db.query(sql, req.body.tutorsessionid, async function (error, results) {
    if (error) throw error;

    if (results.length > 0) {
      sql = 'DELETE FROM tutorsession WHERE tutorsessionid = ?';
      await db.query(sql, req.body.tutorsessionid);
      return res
        .status(200)
        .send({ message: 'Tutor Session successfully deleted' });
    } else {
      return res.status(404).send({ message: 'Tutor Session not found' });
    }
  });
});


//read all entries in tutorsession 
tutorSessionRouter.get('/api/tutorsession/all', async (req, res) => {
  let sql = 'SELECT * FROM tutorsession WHERE requestorid = ?';

  await db.query(sql, req.body.requestorid, async function (error, results) {
    if (error) {
      throw error;
    } else {
      res.status(200).send(results);
    }
  });
});


// tutorsessionmatching
tutorSessionRouter.get('/api/tutorsessionmatching/new', async (req, res) => {
  let body = req.body;

  let query = `
    SELECT tutorid, fname, lname, program, tutorsession.tutorsessionid, tutorsession.subject, tutorsession.requestorid
    FROM tutor
    INNER JOIN tutorsession ON tutor.speciality=tutorsession.subject
    WHERE tutoravailabilitystatus='Available' AND tutorsession.tutorsessionid=?
    `;

  await db.query(query, body.tutorsessionid, async function (error, results) {
    if (error) {
      throw error;
    } else {
      res.status(200).send(results);
    }
  });
});


// 1. write tutor session id, requestor id and matching tutor id in tutorsessionmatching table
//create tutorSession

tutorSessionRouter.post('/api/tutorsessionmatching/new', async (req, res) => {
  let body = req.body;

  let createTutorSessionMatchingQuery =
    'INSERT INTO tutorsessionmatching (tutorsessionid, requestorid, matchingtutorid) VALUES (?,?,?)';
  let param = [
    body.tutorsessionid,
    body.requestorid,
    body.matchingtutorid,
  ];

  await db.query(createTutorSessionMatchingQuery, param);
  return res
    .status(201)
    .send({ message: 'Tutor Session Matching successfully created' });
});

// tutorsessionrating - tutor

tutorSessionRouter.post('/api/tutorsessiontutorrating/new', async (req, res) => {
  let body = req.body;

  let query = 'SELECT * FROM tutorsessiontutorrating WHERE tutorsessionid = ?';

  await db.query(
    query,
    body.tutorsessionid,
    async function (error, results) {
      if (error) throw error;
      // If there is a result, the rating of tutorsession already exists (dont'write it in the database)
      if (results.length > 0) {
        res.send({ message: 'Tutor Session Rating already in exists in database' });
        // Else (if the rating of tutorsession is not found in the database), proceed with writing the rating of tutorsession in the database
      } else {

        let createTutorSessionTutorRatingQuery =
          'INSERT INTO tutorsessiontutorrating (tutorsessionid, assignedtutorid, studentid, tutorcommunication, tutorcommunicationcomment, tutorqualityservice, tutorqualityservicecomment, tutorknowledge, tutorknowledgecomment) VALUES (?,?,?,?,?,?,?,?,?)';
        let param = [
          body.tutorsessionid,
          body.assignedtutorid,
          body.studentid,
          body.tutorcommunication,
          body.tutorcommunicationcomment,
          body.tutorqualityservice,
          body.tutorqualityservicecomment,
          body.tutorknowledge,
          body.tutorknowledgecomment
        ];
        await db.query(createTutorSessionTutorRatingQuery, param);
        return res
          .status(201)
          .send({ message: 'Tutor Session Tutor Rating successfully created' });
      }
    }
  );
});

// tutorsessionrating - student

tutorSessionRouter.post('/api/tutorsessionstudentrating/new', async (req, res) => {
  let body = req.body;

  let query = 'SELECT * FROM tutorsessionstudentrating WHERE tutorsessionid = ?';

  await db.query(
    query,
    body.tutorsessionid,
    async function (error, results) {
      if (error) throw error;
      // If there is a result, the rating of student tutorsession already exists (dont'write it in the database)
      if (results.length > 0) {
        res.send({ message: 'Tutor Session Rating already in exists in database' });
        // Else (if the rating of student tutorsession is not found in the database), proceed with writing the rating of tutorsession in the database
      } else {

        let createTutorSessionStudentRatingQuery =
          'INSERT INTO tutorsessionstudentrating (tutorsessionid, assignedtutorid, studentid, studentpoliteness, studentpolitenesscomment, studentopenness,studentopennesscomment,studentflexibility, studentflexibilitycomment  ) VALUES (?,?,?,?,?,?,?,?,?)';
        let param = [
          body.tutorsessionid,
          body.assignedtutorid,
          body.studentid,
          body.studentpoliteness,
          body.studentpolitenesscomment,
          body.studentopenness,
          body.studentopennesscomment,
          body.studentflexibility,
          body.studentflexibilitycomment
        ];
        await db.query(createTutorSessionStudentRatingQuery, param);
        return res
          .status(201)
          .send({ message: 'Tutor Session Student Rating successfully created' });
      }
    }
  );
});

module.exports = tutorSessionRouter;
