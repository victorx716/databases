var Parse = {

  server: `http://localhost:3000/classes`,

  create: function(message, successCB, errorCB = null) {

    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create message', error);
      }
    });
      },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: `${Parse.server}/messages`,
      type: 'GET',
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  createUser: function(username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Parse.server}/users`,
        type: 'POST',
        data: JSON.stringify({username}),
        contentType: 'application/json',
        success: function(results) {
          resolve(results);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  },

  createRoom: function(roomname) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Parse.server}/rooms`,
        type: 'POST',
        data: JSON.stringify({roomname}),
        contentType: 'application/json',
        success: function(results) {
          resolve(results);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  },

  getRooms: function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${Parse.server}/rooms`,
        type: 'GET',
        contentType: 'application/json',
        success: (rooms) => {
          resolve(rooms); 
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }


};