const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (err) => {
            console.warn('Error', err);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(done);
});