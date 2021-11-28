const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Lol, very funny'
    },
    {
        id: uuid(),
        username: 'Eve',
        comment: 'Oh no!'
    },
    {
        id: uuid(),
        username: 'Kim',
        comment: "I'm lost"
    },
    {
        id: uuid(),
        username: 'Brian',
        comment: 'Help me'
    },
]

app.get('/', (req, res) => {
    const name = 'Home';
    res.render('home', { name })
})


// GET /comments - read comments                        -READ

app.get('/comments', (req, res) => {
    const name = 'Comments';
    res.render('comments/index', { name, comments })
})


// POST /comments - Create new comment                  -CREATE
//New comment form
app.get('/comments/new', (req, res) => {
    const name = 'New Comment';
    res.render('comments/new', { name });
})
//recieve POST request
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;

    comments.push({ id: uuid(), username, comment });
    res.redirect('/comments')
})


// GET /comments/:id - get 1 comment using ID           -SHOW
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    const name = comment.username + "'s comment";
    // console.log('FOUND COMMENT: ', comment)
    res.render('comments/show', { comment, name })
})
//Edit Post
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    const name = "Edit comment";
    res.render('comments/edit', { comment, name })

})


//PATCH /comments/:id - Update 1 comment using ID       -UPDATE
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id == id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})


//DELETE /comments/:id - Delete 1 comment using ID      -DELETE

app.listen(8080, () => {
    console.log('Listening on port: 8080');
})
