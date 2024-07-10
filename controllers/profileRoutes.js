const express = require('express');
const router = express.Router();
const { User, Blog } = require('../models');

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ model: Blog }],
    });

    const userBlogs = user.blogs.map((blog) => blog.get({ plain: true }));

    res.render('profile', {
      name: user.name,
      id: user.id,
      userBlogs: userBlogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;