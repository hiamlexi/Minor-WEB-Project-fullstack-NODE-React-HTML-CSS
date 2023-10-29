var express = require('express');
let mongoose = require('mongoose');
var { Category } = require('../models/categorySchema.js');
var { Thread } = require('../models/threadSchema.js');
var { Post } = require('../models/postSchema.js')
var router = express.Router();
var Auth = require('../middleware/authMiddleware');

router.get('/categories', (req, res, next) => {
    Category.find()
        .then(categoriesList => res.status(200).json({
            // TODO: populate the numPosts and numThreads later, or get rid of in ui
            categories: categoriesList.map(e => {
                return {
                    id: e._id,
                    name: e.name,
                    description: e.description,
                    numPosts: Math.floor(Math.random() * 50),
                    numThreads: Math.floor(Math.random() * 50)
                }
            })
        }))
        .catch(err => next(err));
})

router.get('/categories/:id', (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: 'There is no categories with this ID' })
            }

            res.json(category);
        }).catch(err => next(err));
})

router.post('/categories', Auth.requireAdmin(), (req, res, next) => {
    if(!req.body.name || !req.body.description) {
        return res.status(400).json({ message: '"name" and "description" fields required' });
    }

    var category = new Category({
        name: req.body.name,
        description: req.body.description
    })

    category.save()
        .then(c => res.json(c))
        .catch(err => next(err));
})

router.put('/categories/:id', Auth.requireAdmin(), (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: '"name" and "description" fields required' });
    }

    Category.findById(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: `Category with ID ${req.params.id} not found` });
            }

            category.name = req.body.name;
            category.description = req.body.description;

            category.save()
                .then(updatedCategory => res.json(updatedCategory))
                .catch(err => next(err));
        })
        .catch(err => next(err));
})

router.delete('/categories/:id', Auth.requireAdmin(), (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(categories => {
        if (categories) {
            return res.status(200).json({ success: true, message: 'the categories is deleted' })
        } else {
            return res.status(404).json({ success: false, message: "There is not categories with this ID" })
        }
    }).catch(err => res.status(500).json({ success: false, error: err }));
})

router.delete('/categories', Auth.requireAdmin(), (req, res, next) => {
    Promise.all([Category, Thread, Post].map(e => e.deleteMany({})))
        .then(results => {
            const numDeleted = results.reduce((total, result) => total + result.deletedCount, 0);
            console.log(`Deleted ${numDeleted} entities`);

            // 204 NO CONTENT
            res.status(204).end();
        })
        .catch(error => next(error));
});

router.get('/categories/:id/threads', (req, res, next) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    Category.findById(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: `Category ${req.params.id} does not exist` });
            }
            Thread.countDocuments({ category: req.params.id })
                .then(totalCount => {
                    Thread.aggregate([
                        {
                            $match: { category: new mongoose.Types.ObjectId(req.params.id) }
                        },
                        {
                            $lookup: {
                                from: 'posts',
                                localField: '_id',
                                foreignField: 'thread',
                                as: 'posts',
                            }
                        },
                        {
                            $project: {
                                id: '$_id',
                                title: 1,
                                numPosts: { $size: '$posts' },
                            }
                        }])
                        .skip(offset)
                        .limit(limit)
                        .exec()
                        .then((threads) => {
                            res.json({
                                threads: threads,
                                totalPosts: totalCount
                            });
                        })
                        .catch(err => next(err));
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

router.get('/categories/:id/threads/:threadId', (req, res, next) => {
    Thread.findById(req.params.threadId)
        .then(thread => {
            if (!thread) {
                res.status(404).end({ message: `Thread with ID ${req.params.id} not found` });
            }

            if (thread.category != req.params.id) {
                return res.status(404).json({ message: `Thread ${req.params.threadId} in category ${req.params.id} not found` });
            }

            return res.json(thread);
        })
        .catch(err => next(err));
});


module.exports = router;
