const express = require('express')
const Posts = require('./posts-model')

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "Error: posts not found"
        })
    })
    
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    let returnPost;
    Posts.findById(id)
    .then(post => {
        returnPost = post;
    })
    .then(() => {if (!returnPost) {
res.status(404).json({
    message: "this id is not a real post"
})
    }
    else {
        res.status(200).json(returnPost)
    }}
    
    
    )
})

module.exports = router;
// implement your posts router here
