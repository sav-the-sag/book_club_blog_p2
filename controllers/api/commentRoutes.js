// imports
const router = require("express").Router();
const { Post, Comment, User } = require("../../models");

// CREATE Comment
router.post("/", async (req, res) => {
    try {
      console.log("we made it");
      const comment = await Comment.create({
        comment_body: req.body.comment_body,
        blogPost_id: req.body.blogPost_id,
        user_id: req.session.user_id || req.body.user_id,
      });
  
      res.status(200).json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

// READ all Comments
router.get("/", async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: BlogPost,
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });