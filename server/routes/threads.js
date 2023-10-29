var express = require('express');
var { Thread } = require('../models/threadSchema.js')
var { Post } = require('../models/postSchema.js')
var { Category } = require('../models/categorySchema.js')
var router = express.Router();
var Auth = require('../middleware/authMiddleware');

router.get('/threads', (req, res, next) => {
    Thread.find()
        .then(threads => res.json({ threads: threads }))
        .catch(err => next(err));
});

router.get('/threads/:id', (req, res, next) => {
    Thread.findById(req.params.id)
        .then(thread => {
            if(!thread) {
                return res.status(404).json({ message: `Thread with ID ${req.params.id} not found` });
            }

            res.json(thread);
        })
        .catch(err => next(err));
});

router.get('/threads/:id/posts', (req, res, next) => {
    Thread.findById(req.params.id)
        .then(thread => {
            if(!thread) {
                return res.status(404).json({ message: `Thread with ID ${req.params.id} not found` });
            }

            Post.find({ thread: req.params.id })
                .populate({
                    path: 'poster',
                    select: 'username joinDate'
                })
                .exec()
                .then(posts => res.json({ posts: posts }))
                .catch(err => next(err))
        }).catch(err => next(err));
});

router.post('/threads', Auth.requireAuthentication(), (req, res, next) => {
    if (!req.body.title || !req.body.categoryId || !req.body.message) {
        return res.status(400).json({ message: 'Following fields required: title, categoryId, message' });
    }

    Category.findById(req.body.categoryId)
        .then(category => {
            if(!category) {
                return res.status(404).json({ message: `Category ${req.body.categoryId} doesn't exist` });
            }

            const thread = new Thread({
                title: req.body.title,
                poster: req.session.passport.user.id,
                category: req.body.categoryId
            });
        
            thread.save()
                .then(thread => {
                    const firstPost = new Post({
                        message: req.body.message,
                        thread: thread._id,
                        poster: req.session.passport.user.id
                    });
        
                    firstPost.save()
                        .then(post => res.json({
                            id: thread._id,
                            title: thread.title,
                            categoryId: thread.category
                        }))
                })
                .catch(err => next(err));
        }).catch(err => next(err));
});

router.post('/threads/:id/posts', Auth.requireAuthentication(), (req, res, next) => {
    if (!req.body.message) {
        return res.status(400).json({ message: 'Following fields required: message' });
    }
    const post = new Post({
        message: req.body.message,
        poster: req.session.passport.user.id,
        thread: req.params.id
    });

    Thread.findById(req.params.id)
        .then(thread => {
            if(!thread) {
                return res.status(404).json({ message: `Thread ${req.params.id} not found` });
            }

            post.save()
            .then(post => res.json({
                id: post._id,
                message: post.message,
                threadId: post.thread
            }))
            .catch(err => next(err));
        }).catch(err => next(err));
});

router.delete('/threads/:threadId/posts/:id', Auth.requireAuthentication(), (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: `Post ${req.params.id} not found` });
            }

            if (post.thread != req.params.threadId) {
                return res.status(404).json({ message: `Post ${req.params.id} in thread ${req.params.threadId} not found` });
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

module.exports = router;
