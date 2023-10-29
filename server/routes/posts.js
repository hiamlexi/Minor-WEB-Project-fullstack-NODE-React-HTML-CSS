var express = require('express');
var router = express.Router();
var { Post } = require('../models/postSchema');
var { Thread } = require('../models/threadSchema');
var Auth = require('../middleware/authMiddleware');

router.post('/posts', Auth.requireAuthentication(), (req, res, next) => {
    // TODO: if we want to be able to do User.find().populate('posts'), then we need to 
    //       find the user here and do: user.posts.push(post), according to docs:
    //       https://mongoosejs.com/docs/populate.html#refs-to-children

    if (!req.body.message) {
        return res.status(400).json({ message: 'message field required' });
    }

    if (!req.body.thread) {
        return res.status(400).json({ message: 'thread field required' });
    }

    Thread.findById(req.body.thread)
        .then(thread => {
            if(!thread) {
                return res.status(404).json({ message: `thread ${req.body.thread} doesn't exist` });
            }

            const post = new Post({
                message: req.body.message,
                poster: req.session.passport.user.id,
                thread: req.body.thread
            });
        
            post.save()
                .then(post => res.json({
                    id: post._id,
                    message: post.message,
                    threadId: post.thread
                }))
                .catch(err => next(err));
        }).catch(err => next(err));
});

router.get('/posts', (req, res, next) => {
    Post.find()
        .then(posts => res.json({ "posts": posts }))
        .catch(err => next(err));
});

router.delete('/posts/:id', Auth.requireAuthentication(), (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: `Post ${req.params.id} not found` });
            }

            // Only allow deleting if user is an admin or the author of the post
            if(!req.session.passport.user.isAdmin && req.session.passport.user.id != post.poster) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            Post.deleteOne({_id: req.params.id})
                .exec()
                .then(() => res.status(204).send())
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

router.patch('/posts/:id', Auth.requireAuthentication(), (req, res, next) => {
    if(!req.body.message) {
        return res.status(400).json({ message: 'message feild required' });
    }

    Post.findById(req.params.id)
        .then(post => {
            if(!post) {
                return res.status(404).json({ message: `Post ${req.params.id} does not exist` });
            }

            // Only allow editing if user is an admin or the author of the post
            if(!req.session.passport.user.isAdmin && req.session.passport.user.id != post.poster) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            // Our usecase here is to edit a post message. Allowing a user to change any other field of a post
            // doesn't really make sense, so the actual message is the only field we update here
            post.message = req.body.message || post.message;

            post.save()
                .then(savedPost => res.json(savedPost))
                .catch(err => next(err));    
        }).catch(err => next(err))
});

module.exports = router;
