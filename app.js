const express = require("express");

              const bodyparser = require("body-parser");

const mongoose = require("mongoose");

                 const Blog = require("./models/Blog"); 

const path = require("path");

const app = express();


           mongoose.connect("mongodb://127.0.0.1:27017/BLOG_platform");


    app.use(bodyparser.urlencoded({ extended: true }));

            app.set("view engine", "ejs");


app.get("/home", (req, res) => {

          res.render("home", { title: "Welcome to My Blog Platform" });
});


app.get("/blogs", async (req, res) => {
            try {
                   const blogs = await Blog.find(); 
  res.render("blogs", { blogs });
            } catch (err) {
 console.error(err);
             res.status(500).send("Error fetching blogs.");
    }
});

app.get("/create", (req, res) => {  

             res.render("create");  
});


app.post("/create", async (req, res) => {  
                  try {
                           const { title, content } = req.body;
  const newBlog = new Blog({ title, content }); 
                 await newBlog.save(); 
 res.redirect("/blogs"); 
                   } catch (err) {
  console.error(err);
             res.status(500).send("Error creating blog.");
    }
});

app.listen(5000, () => {
    console.log("Server is running on");
});
