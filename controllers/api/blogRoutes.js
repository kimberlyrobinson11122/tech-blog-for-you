const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/blogs - Get ALL blog posts with comments
router.get('/', withAuth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: Comment,
        attributes: ['comment_text', 'comment_author', 'blog_id'] 
      }
    });
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST /api/blogs - Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    // Ensure required fields are present in req.body
    const { title, description, author } = req.body;
    if (!title || !description || !author) {
      return res.status(400).json({ message: 'Title, description, and author are required fields.' });
    }
    console.log("userid, ", req.session.user_id);
    
    // Create new blog post linked to the current user
    const newBlog = await Blog.create({
      title,
      description,
      author,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE /api/blogs/:id - Delete a blog post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Ensure the blog post exists and belongs to the current user
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

