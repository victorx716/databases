var db = require('../db').connection;
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (cb) {
      var queryString = 'SELECT * FROM JoinedMessages';
      var queryArgs = [];
      db.query(queryString, queryArgs, (err, results) => {
        if (err) throw err;
        var stringifiedResults = results.map(result => {
          result.text = result.text.toString();
          return result;
        });
        cb(null, stringifiedResults);
      });
    }, // a function which produces all the messages
    post: function (message) {
      return new Promise((resolve, reject) => {
        var queryString = 'INSERT INTO Messages (u_id, r_id, text, created_at) VALUES (?, ?, ?, ?)';
        var queryArgs = [message.u_id, message.r_id, message.text, Date.now()];
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
            resolve(results[0]);
          }
        });
      })
    }
  },


  users: {
    // Ditto as above.
    get: function () {},
    post: function (username) {
      console.log('in promise for users');
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
  }
};
