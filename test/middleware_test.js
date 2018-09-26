const assert = require('assert');
User = require('../src/user');
BlogPost = require('../src/blogpost');

describe('Middleware', () => {
    
    let joe, blogPost;
    beforeEach(async () => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is great', content: 'Lorem ipsum' });

        joe.blogPosts.push(blogPost);

        await Promise.all([
            joe.save(),
            blogPost.save()
        ]);
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});