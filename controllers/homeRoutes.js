//Creating home routes for authentication
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

 router.get('/', async (req, res) => {
   try {
    
    //  const dbUserData = await User.findAll({
    //    include: [
    //      {
    //        model: Post,
    //        attributes: ['name', 'description'],
    //      },
    //    ],
    //  });

    //  const users = dbUserData.map((user) =>
    //    user.get({ plain: true })
    //  );
     res.render('homepage')//, {
     console.log('this is line 22!')  // users,
     // });
   } catch (err) {
     console.log(err);
     res.status(500).json("OH NOOOOO!!!! not again X[");
   }
 });

// Get for one post based on id
// If the user is logged in, they can see the post data
router.get('/post/:id', async (req, res) => {
  try {
    
    const dbPostData = await Post.findByPk( 
      req.params.id
      );
      const post = dbPostData.get({plain:true});
      res.json(post)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// login information
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;