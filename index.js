const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors())
const port = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://aungminkhant:test123@cluster0.uatkvao.mongodb.net/?retryWrites=true&w=majority')
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

app.get('/posts/:topic/', (req,res) => {

    const topic = req.params.topic

    let query = {};
    if (topic !== 'All') {
        query.topic = topic;
    }
console.log(topic);

    Post.find(query)
        .then(result => res.json(result))
        .catch(err => console.log('Error sending posts'))
})

