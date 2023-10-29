var express = require('express');
var router = express.Router();
var { User } = require('../models/userSchema');
var { Post } = require('../models/postSchema');
var Auth = require('../middleware/authMiddleware');

router.get('/users', (req, res, next) => {
    console.log(User);
    User.find()
        .select('-password') // Exclude password from projection
        .then(users => res.json({ "users": users }))
        .catch(err => next(err));
});

router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .select('-password')
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: `User ${req.params.id} not found` });
            }

            res.json(user);
        })
        .catch(err => next(err));
});

router.post('/users', (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    User.countDocuments()
        .exec()
        .then(userCount => {
            const user = new User({
                username: req.body.username,
                password: req.body.password, // TODO: hash using something like bcrypt later?
                joinDate: new Date(),
                isAdmin: userCount === 0
            });

            user.save()
                .then(user => res.json({
                    id: user._id,
                    username: user.username,
                    joinDate: user.joinDate
                }))
                .catch(err => next(err)); // TODO: better error handling
    })
});

router.delete('/users', Auth.requireAdmin(), (req, res, next) => {
    User.deleteMany().exec()
        .then(() => res.status(204).send())
        .catch(err => next(err));
});

router.delete('/users/:id', Auth.requireAdmin(), (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).exec()
        .then(() => res.status(204).send())
        .catch(err => next(err));
});

router.put('/users/:id', Auth.requireAdmin(), (req, res, next) => {
    // TODO: extract validation in case it's expanded, same as in POST
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                username: req.body.username,
                password: req.body.password, // TODO: hash using something like bcrypt later?
            }
        },
        { new: true })
        .then(updatedUser => {
            if(!updatedUser) {
                return res.status(404).json({ message: `User ${req.params.id} not found` });
            }

            res.json({
                id: updatedUser._id,
                username: updatedUser.username,
                joinDate: updatedUser.joinDate
            });
        })
        .catch(err => next(err));
});

router.patch('/users/:id', Auth.requireAdmin(), (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: `User ${req.params.id} not found` });
            }
            user.username = req.body.username || user.username;
            user.password = req.body.password || user.password; // TODO: hash using something like bcrypt later?
            user.save();

            res.json({
                id: user._id,
                username: user.username,
                joinDate: user.joinDate
            });
        })
        .catch(err => next(err));
});

router.get('/users/:id/posts', (req, res, next) => {
    User.find({ _id: req.params.id})
        .then(user => {
            if(!user) {
                return res.status(404).json({ message: `User with id ${req.params.id} doesn't exist`})
            }

            Post.find({ poster: req.params.id })
                .then(p => res.json({ posts: p }))
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

module.exports = router;
