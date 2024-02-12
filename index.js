const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();


app.use(cors())
const port = process.env.PORT || 3001;

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.uatkvao.mongodb.net/?retryWrites=true&w=majority`)
    .then(result => console.log('Successfully connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB'))

const postSchema = new mongoose.Schema({
    image: String,
    title: String,
    topic: String,
    content: String
})
const Post = mongoose.model('Post', postSchema);




app.listen(port, (req,res) => {
    console.log('Server is running on port',port);
})


app.post('/posts/', (req,res) => {
    const body = req.body;
    const newPost = new Post({
        image: body.image,
        title: body.title,
        topic: body.topic,
        content: body.content
    })
    newPost.save()
        .then(result => res.send('Post submitted'))
        .catch(err => console.log('error saving post',err))
})

app.get('/posts/:topic/:id?', (req,res) => {

    const topic = req.params.topic;
    const id = req.params.id;


    let query = {};
    if (topic !== 'All') {
        query.topic = topic;
    }

    if (id) {
        Post.findById(id)
            .then(result => res.json(result))
            .catch(err => console.log('Error finding post with that ID.'))
    }


    Post.find(query)
        .then(result => res.json(result))
        .catch(err => console.log('Error fetching posts.'))
})

