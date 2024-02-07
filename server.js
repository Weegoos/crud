const express = require('express')
const path = require('path')

const app = express()
const blogsRouter = require('./blogs/blogServerCode')
app.use('/blogs', blogsRouter);

const readRouter = require('./reader/readServerCode')
app.use('/read', readRouter)

app.get('/blogs', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'blogs', 'blogs.html'))
})
app.use('/blogs', express.static(path.resolve(__dirname, 'blogs')));

app.get('/read', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'reader', 'read.html'))
})
app.use('/reader', express.static(path.resolve(__dirname, 'reader')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'main', 'mainPage.html'))
})

app.use('/main', express.static(path.resolve(__dirname, 'main')))

app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'registration', 'req.html'))
})

app.use('/registration', express.static(path.resolve(__dirname, 'registration')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
