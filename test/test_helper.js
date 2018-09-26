const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

before((done) => {
    mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => { 
            console.log('connected to Mongo');
            done(); 
        })
        .on('error', (err) => {
            console.warn('Error', err);
        });
});

beforeEach(async () => {
    try {
        await mongoose.connection.collections.users.drop();
    } catch(e) {
        console.log('skip collection drop');
    }
});