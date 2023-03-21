const express = require('express')
const Posts = require('./posts-model')

const router = express.Router();
router.use(express.json())

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

router.post('/', async (req, res) => {

// const { title, contents } = req.body;
// Posts.insert({title, contents})
// .then(({ id }) => {
//     console.log(id)
// }
// )
// .catch()




try {
console.log(req.body)
await Posts.insert(req.body)
.then(({id}) => {
    res.status(201).json({
        message: `The post with the id of ${id} has been created`
    });
})

}
catch (err) {
res.status(500).json({
    message: "Error, unable to post",
    error: err.message
})
}
})



router.put('/:id', async (req, res) => {
const postId = await Posts.update(req.params.id, req.body)

try {
    if (!postId) {
        res.status(404).json({
            message: "the post does not exist",
        })
    } else {
        res.status(201).json({
            message: "The update worked! the following post is now updated:",
            updated_post: req.body
        })
    }
}
catch (err) {
    res.status(500).json({
        message: "The post could NOOTTTTT be retrieved",
        err: err.message
    })
}
//     try {
// await Posts.update(req.params.id, req.body);
// res.status(201).json({
//     message: `The post with the id ${req.params.id} has successfully been updated`,
//     updated_post: req.body
// })
//     }
//     catch (err) {
//         res.status(404).json({
//             message: "error, update incomplete",
//             err: err.message
//         })
//     }
})



module.exports = router;
// implement your posts router here
