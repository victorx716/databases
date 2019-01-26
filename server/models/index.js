var db = require('../db').connection;
var Promise = require('bluebird');
var moment = require('moment');

module.exports = {
  messages: {
    get: function () {
      return new Promise((resolve, reject) => {
        var queryString = 'SELECT * FROM JoinedMessages';
        var queryArgs = [];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            var stringifiedResults = results.map(result => {
              result.text = result.text.toString();
              return result;
            });
            resolve(stringifiedResults);
          }        
        });
      })
    },
    post: function (message) {
      return new Promise((resolve, reject) => {
        var queryString = 'INSERT INTO Messages (u_id, r_id, text, created_at) VALUES (?, ?, ?, ?)';
        var queryArgs = [message.u_id, message.r_id, message.text, moment().format('YYYY-MM-DD HH:MM:SS')];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },
    getIdFromTable: function(tablename, field, fieldValue) {
      return new Promise((resolve, reject) => {
        var queryString = `SELECT id FROM ${tablename} WHERE ${field} = ?`;
        var queryArgs = [fieldValue];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0].id);
          }
        });
      })
    }
  },

  users: {
    get: function () {
      return new Promise((resolve, reject) => {
        var queryString = 'SELECT * FROM Users';
        var queryArgs = [];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
    },
    post: function (username) {
      return new Promise((resolve, reject) => {
        var queryString = 'INSERT INTO Users (username) VALUES (?)';
        var queryArgs = [username];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }
  },

  rooms: {
    get: function() {
      return new Promise((resolve, reject) => {
        var queryString = 'SELECT * FROM Rooms';
        var queryArgs = [];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
    },
    post: function(roomname) {
      return new Promise((resolve, reject) => {
        var queryString = 'INSERT INTO Rooms (roomname) VALUES (?)';
        var queryArgs = [roomname];
        db.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }
  }
};
