var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(messages => {
          res.send(messages);
        })
        .catch(err => {
          res.send(err);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.getIdFromTable('Users', 'username', req.body.username)
        .then((u_id) => {
          models.messages.getIdFromTable('Rooms', 'roomname', req.body.roomname)
            .then(r_id => {
              var message = {
                u_id: u_id,
                r_id: r_id,
                text: req.body.message
              };
              return models.messages.post(message);
            })
            .then((results) => {
              res.send(results);
            })
            .catch((err) => {
              throw(err);
            });
        })
        .catch((err) => {
          throw(err);
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get()
        .then(users => {
          res.send(users);
        })
        .catch(err => {
          res.send(err);
        });
    },
    post: function (req, res) {
      models.users.post(req.body.username)
        .then(results => {
          res.send(results);
        })
        .catch(err => {
          res.send(err);
        });
    }
  },

  rooms: {
    get: function(req, res) {
      models.rooms.get()
        .then(rooms => {
          res.send(rooms);
        })
        .catch(err => {
          res.send(err);
        });
    },
    post: function(req, res) {
      models.rooms.post(req.body.roomname)
        .then(results => {
          res.send(results);
        })
        .catch(err => {
          res.send(err);
        });      
    }
  }
};

