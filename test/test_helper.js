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
    const { users, comments, blogposts } = mongoose.connection.collections;
    try {
        await users.drop();
        await comments.drop();
        await blogposts.drop();
    } catch(e) {
        //console.log('skip collection drop');
    }
});