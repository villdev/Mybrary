const express = require("express");
const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");

//? coz app.use("/authors", authorRouter); in server.js so its prepended with /authors...
//all authors route
// router.get("/", (req, res) => {
//   res.render("authors/index");
// });

//?changed above code coz async
//? all authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    // we will use req.query instead of req.body. Get req sends info through the query string while post through the body
    searchOptions.name = new RegExp(req.query.name, "i"); //regularExpression -> so that we can search for just a part of the text inside of our field. "i" case insensitive
  }
  try {
    // const authors = await Author.find({}); //empty obj means no conditions, search for everything
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//new authors route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new author() });
});
//authors/new...

//create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     res.render("authors/new", {
  //       author: author,
  //       errorMessage: "Error creating author",
  //     });
  //   } else {
  //     // res.redirect(`authors/${newAuthor.id}`);
  //     res.redirect(`authors`);
  //   }
  // });
  // // res.send(req.body.name); //req.body -> body of form, name input
  //changed above comment cz the post callbck function been changed to async
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

module.exports = router;
