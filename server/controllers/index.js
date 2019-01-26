var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('req body is', req.body);
      //var result = models.messages.post(req.body);
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
              response.send(results);
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
    get: function (req, res) {},
    post: function (req, res) {
      console.log('got here');
      models.users.post(req.body.username)
        .then(results => {
          res.send(results);
        })
        .catch(err => {
          res.send(err);
        })
    }
  }
};

