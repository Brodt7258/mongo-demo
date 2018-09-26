const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');

describe('Associations', () => {
    
    let joe, blogPost, comment;
    beforeEach(async () => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is great', content: 'Lorem ipsum' });
        comment = new Comment({ content: 'derp' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        await Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ]);
    });

    it('saves a relation between a user and a blogPost', (done) => {
        User.findOne({ name: 'Joe' })
        .populate('blogPosts')
        .then((user) => {
            assert(user.blogPosts[0].title === 'JS is great');
            done();
        });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Joe');
            assert(user.blogPosts[0].title === 'JS is great');
            assert(user.blogPosts[0].comments[0].content === 'derp');
            assert(user.blogPosts[0].comments[0].user.name === 'Joe');
            done();
        });
    });
})
