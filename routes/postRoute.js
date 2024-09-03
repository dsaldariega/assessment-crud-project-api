const express = require("express");
const {
  createPost,
  fetchAllPost,
  fetchOnePost,
  updatePost,
  deletePost,
} = require("../controllers/postController.js");

const router = express.Router();

//create new post
router.post("/", createPost);

//route get all posts
router.get("/", fetchAllPost);

//get one post by id
router.get("/:id", fetchOnePost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

module.exports = router;
