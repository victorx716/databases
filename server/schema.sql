DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;


CREATE TABLE Users (
  /* Describe your table here.*/
  id INT(4) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  ADD CONSTRAINT unique_username UNIQUE KEY (username)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE Rooms (
  id INT(4) AUTO_INCREMENT PRIMARY KEY,
  roomname VARCHAR(30) NOT NULL
);

CREATE TABLE Messages (
  id INT(4) AUTO_INCREMENT PRIMARY KEY,
  u_id INT(4) NOT NULL,
  r_id INT(4) NOT NULL,
  text BLOB NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (u_id) REFERENCES Users(id),
  FOREIGN KEY (r_id) REFERENCES Rooms(id)
);

CREATE VIEW JoinedMessages AS 
  SELECT m.id AS message_id, 
         m.u_id AS user_id, 
         u.username AS username, 
         m.r_id AS room_id, 
         r.roomname AS roomname,
         m.text AS text,
         m.created_at AS created_at
    FROM Messages m 
   INNER JOIN Users u 
      ON (m.u_id=u.id) 
   INNER JOIN Rooms r 
      ON (r.id=m.r_id);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

