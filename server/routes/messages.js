var express = require('express');
var router = express.Router();
var { Message } = require('../models/messageSchema');
var Auth = require('../middleware/authMiddleware');
const { User } = require('../models/userSchema');

router.post('/messages', Auth.requireAuthentication(), (req, res, next) => {

    if (!req.body.receiver) {
        return res.status(400).json({ error: 'Receiver adress are required' });
    }
    
    User.findOne({ username: req.body.receiver })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Receiver adress are required' });
            }

            const message = new Message({
                title: req.body.title,
                message : req.body.message,
                sender : req.session.passport.user.id,
                receiver : user._id,
                readStatus : false,
                sendDate : new Date()
            });

            message.save()
            .then(message => res.json({
                title: message.title,
                message: message.message,
                sender: message.sender,
                receiver : message.receiver,
                readStatus : message.readStatus,
                sendDate : message.sendDate
            }))
            .catch(err => next(err));
        })
        .catch(err => next(err));
});

router.get('/messages', Auth.requireAuthentication(), (req, res, next) => {
    const userId = req.session.passport.user.id;

    Message.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    })
        .populate({
            path: 'sender',
            select: 'username _id'
        })
        .populate({
            path: 'receiver',
            select: 'username _id'
        })
        .then(messages => res.json({ "messages": messages }))
        .catch(err => next(err));
});

router.put('/messages/:id', Auth.requireAuthentication(), (req, res, next) => {
    Message.findById(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(404).json({ message: `Message with ID ${req.params.id} not found` });
            }

            message.readStatus = true;

            message.save()
                .then(updatedMessage => res.json(updatedMessage))
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

router.get('/messages/unread', Auth.requireAuthentication(), (req, res, next) => {
    Message.countDocuments({
        receiver: req.session.passport.user.id,
        readStatus: false
    })
        .then(count => {
            res.json({ count });
        })
        .catch(err => next(err));
});

router.get('/messages/:id', Auth.requireAuthentication(), (req, res, next) => {
    Message.findById(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(404).json({ message: `Message with ID ${req.params.id} not found` });
            }

            return res.json(message);
        })
        .catch(err => next(err));
});

router.delete('/messages', Auth.requireAdmin(), (req, res, next) => {
    Message.deleteMany().exec()
        .then(() => res.status(204).send())
        .catch(err => next(err));
});

router.delete('/messages/:id', Auth.requireAuthentication(), (req, res, next) => {
    Message.deleteOne({_id: req.params.id}).exec()
        .then(() => res.status(204).send())
        .catch(err => next(err));
});

// we dont implement the patch method here since the user
//shouldn't be able to modify the msg they have sent

module.exports = router;
