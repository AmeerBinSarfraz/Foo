const passport = require('passport');
const requireAuth = passport.authenticate('local', { session: false });

module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new user
    app.post('/users', users.create);

    //login user 
    app.post('/login', requireAuth, users.login);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', users.findOneUser);

    // Update a user with userId
    app.put('/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/users/:userId', users.delete);
}