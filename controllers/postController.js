const Post = require("../models/postModel");

const fetchAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error });
  }
};

const fetchOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    return res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      body: req.body.body,
      user: req.body.user,
    };
    const post = await Post.create(newPost);
    return res.status(201).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createPost,
  fetchAllPost,
  fetchOnePost,
  updatePost,
  deletePost,
};
