const express = require('express')

const postRoutes = require('./posts/posts-router')


const server = express()

server.use('/api/posts', postRoutes)
server.use(express.json())

server.use('*', (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})


module.exports = server;
// implement your server here
// require your posts router and connect it here
