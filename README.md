# CapstoneProject - TutorMe

# Installation
```npm install```

# Scripts
## Start server
``` npm start```

## Start server in development mode
``` npm run dev```

### Database Setup

Enter the below in DBeaver
```
CREATE DATABASE tutorapp;

USE tutorapp;

CREATE TABLE IF NOT EXISTS `student` ( 
  `studentid` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL, 
  `password` varchar(10) NOT NULL, 
   `fname` varchar(80) NOT NULL, 
  `lname` varchar(80) NOT NULL, 
  `location` varchar(80) NOT NULL, 
  `DOB` date NOT NULL, 
  `school_program` varchar(150) NOT NULL, 
  `profilepicture` varchar(255),  
  `emailaddress` varchar(255), 
  PRIMARY KEY (`studentid`) 
   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1; 


 CREATE TABLE IF NOT EXISTS `tutor` ( 
  `tutorid` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL, 
  `password` varchar(10) NOT NULL, 
  `fname` varchar(80) NOT NULL, 
  `lname` varchar(80) NOT NULL, 
  `location` varchar(80) NOT NULL, 
  `speciality` varchar(500) NOT NULL, 
  `program` varchar(500) NOT NULL,
  `tutoravailabilitystatus` varchar(500) NOT NULL,
  `profilepicture` varchar(255),
  `criminalrecord` varchar(500),
  `emailaddress` varchar(255), 
  `language` varchar(500) NOT NULL,
  PRIMARY KEY (`tutorid`) 
   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1; 
   

 CREATE TABLE IF NOT EXISTS `tutorsession` ( 
  `tutorsessionid` int(5) NOT NULL AUTO_INCREMENT,
  `subject` varchar(5000) NOT NULL, 
  `topic` varchar(5000) NOT NULL, 
  `context` varchar(5000) NOT NULL, 
  `tasksalreadycompleted` varchar(5000) NOT NULL, 
  `questionstobeanswered` varchar(5000) NOT NULL, 
  `expectedduration` varchar(1000) NOT NULL, 
  `language` varchar(500) NOT NULL,
  `requestorid` int(5) NOT NULL, 
  `sessionstatus` varchar (100),
  PRIMARY KEY (`tutorsessionid`),
  FOREIGN KEY (`requestorid`) REFERENCES student (`studentid`)
   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
  
  
 CREATE TABLE IF NOT EXISTS `tutorsessiontutorrating` ( 
  `tutorsessionid` int(5),
  `assignedtutorid` int(5),
  `studentid` int(5),
  `tutorcommunication` int(2),
  `tutorcommunicationcomment` varchar(5000),
  `tutorqualityservice` int(2),
  `tutorqualityservicecomment` varchar(5000),
  `tutorknowledge` int(2),
  `tutorknowledgecomment` varchar(5000),
   FOREIGN KEY (`tutorsessionid`) REFERENCES tutorsession (`tutorsessionid`),
   FOREIGN KEY (`assignedtutorid`) REFERENCES tutor (`tutorid`),
   FOREIGN KEY (`studentid`) REFERENCES student (`studentid`)
   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1; 
  
  
   CREATE TABLE IF NOT EXISTS `tutorsessionstudentrating` ( 
  `tutorsessionid` int(5),
  `assignedtutorid` int(5),
  `studentid` int(5),
  `studentpoliteness` int(2),
  `studentpolitenesscomment` varchar(5000),
  `studentopenness` int(2),
  `studentopennesscomment` varchar(5000),
  `studentflexibility` int(2),
  `studentflexibilitycomment` varchar(5000), 
  FOREIGN KEY (`tutorsessionid`) REFERENCES tutorsession (`tutorsessionid`),
  FOREIGN KEY (`assignedtutorid`) REFERENCES tutor (`tutorid`),
  FOREIGN KEY (`studentid`) REFERENCES student (`studentid`)
   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;  
  

 CREATE TABLE IF NOT EXISTS `tutorsessionmatching` ( 
  `tutorsessionid` int(5),
  `requestorid` int(2),
  `matchingtutorid` int(5),
  `confirmation` varchar(10),
  FOREIGN KEY (`tutorsessionid`) REFERENCES tutorsession (`tutorsessionid`),
  FOREIGN KEY (`matchingtutorid`) REFERENCES tutor (`tutorid`),
  FOREIGN KEY (`requestorid`) REFERENCES student (`studentid`)
   ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;   



```

