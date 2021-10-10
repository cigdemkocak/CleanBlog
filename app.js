const express = require('express');
const mongoose = require('mongoose');

const methodOverride = require('method-override')
const path = require('path');
const ejs = require('ejs');

const Post = require('./models/Post');
const postControllers = require('./controllers/postControllers')
const pageController = require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db',{
  useNewUrlParser : true,
  useUnifiedTopology : true,
})

//TEMPLATE ENGINE
app.set("view engine" , "ejs");

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', postControllers.getAllPosts);
app.get('/posts/:id', postControllers.getPost);
app.post('/posts', postControllers.createPost);
app.put('/posts/:id', postControllers.updatePost);
app.delete('/posts/:id', postControllers.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
