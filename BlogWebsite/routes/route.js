const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;
const db = require("/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/BlogWebsite/database/database.js")
const mongodb = require("/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/BlogWebsite/database/database1.js")

router.get('/', function(req,res){
    res.redirect('/posts');
})

router.get('/posts', async function(req,res){
    const query = `select posts.*, authors.name as author_name from posts 
    INNER JOIN authors on posts.authorid = authors.id;`
    const [posts] = await db.query(query);
    const documents = await mongodb.getdb().collection('posts').find().toArray();
    const authors = await mongodb.getdb().collection('authors').find().toArray();
    console.log(documents)
    console.log(authors)
    res.render('posts-list',{posts:posts, len1:Object.keys(posts).length, documents : documents, len2:Object.keys(documents).length, authors:authors});
})

router.get('/new-post', async function(req,res){
    const [authors] = await db.query("SELECT * FROM authors");
    const documents = await mongodb.getdb().collection('authors').find({}).toArray();
    console.log(documents)
    res.render('create-post', {authors:authors, documents:documents})

})

router.post("/posts", async function(req,res){
    const data = [
        {"title":req.body.title,
        "summary":req.body.summary,
        "body":req.body.content,
        "author":req.body.author}
    ];
    //await db.query("INSERT INTO posts (title,summary,body,authorid) VALUES (?)",[data,]);
    console.log(data)
    await mongodb.getdb().collection("posts").insertMany(data);
    res.redirect("/posts");
});

router.get("/posts/:id", async function (req,res){
    
    const query1 = `SELECT posts.*, authors.name AS author_name, authors.email AS
    author_email FROM posts INNER JOIN authors ON posts.authorid = authors.id
    WHERE posts.id = ?
    `;
    // const [posts] = await db.query(query1, [req.params.id]);

    // if(!posts || Object.keys(posts).length === 0){
    //     return res.status(404).render("404");
    // }
    // const postData = {
    //     ...posts[0],
    //     date: posts[0].date.toISOString(),
    //     humanReadableDate: posts[0].date.toLocaleDateString("en-US",{
    //         weekday: "long",
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //     })
    // }
    res.render("post-detail",{post:postData});
})

router.get("/posts/:id/edit", async function(req, res){
    const query = `Select * from posts where id = ?`
    
    const [posts] = await db.query(query,[req.params.id]);

    if(!posts || Object.keys(posts).length === 0){
        return res.status(404).render("404");
    }

    res.render("update-post",{post:posts[0]});
})

router.post("/posts/:id/edit", async function (req, res){
    const query = `UPDATE posts SET title = ?, summary = ?, body = ? 
    WHERE id = ?
    `;
    
    await db.query(query, [
        req.body.title, 
        req.body.summary, 
        req.body.content, 
        req.params.id
    ]);
    res.redirect("/posts");
})

router.get("/posts/:id/delete", async function (req, res){
    // const query = `DELETE FROM posts WHERE id = ?`;
    
    // await db.query(query,[req.params.id])
    await mongodb.getdb().collection('posts').deleteOne({_id: new ObjectId(req.params.id)})
    
    res.redirect("/posts");
})

module.exports = router;