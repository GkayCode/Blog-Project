var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { timeStamp } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let blogList = []

app.get('/',(req,res) => {
    res.redirect('/blog')
})

app.post("/create", (req,res) => {
    const {title,desc,type,username} = req.body;
    const date = Date(timeStamp).toLocaleString('eng-ENG');

    const createBlog = 
        {
            title,
            desc,
            type,
            username,
            date
        }
    

    blogList.push(createBlog)

    res.redirect("/blog")
})

app.get('/create', (req,res) => {
    res.render("create")
})


app.get('/blog', (req,res) => {
    res.render('blog', {blogList})
})


app.listen(3000,() => {
    console.log("Worked");
    
})


module.exports = app;
