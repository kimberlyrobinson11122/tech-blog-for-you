const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST new comment
router.post('/', withAuth, async (req, res) => {
    console.log('Hitting the new comment route');
    try {
        const { comment_text, blog_id } = req.body;
        const user_id = req.session.user_id;

        const newComment = await Comment.create({
            user_id,
            comment_text,
            blog_id,
            comment_author: req.session.name
        });

        console.log('New comment created:', newComment);

        res.status(201).json(newComment); // Use status 201 for successful creation
    } catch (err) {
        console.error('Error creating comment:', err.message);
        res.status(400).json({ error: 'Failed to create comment' });
    }
});

// DELETE comment
router.delete('/:id', withAuth, async (req, res) => {
    console.log(id)
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        if (commentData.user_id !== req.session.user_id) {
            return res.status(401).json({ error: 'Unauthorized to delete this comment' });
        }
        await commentData.destroy();
        res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        console.error('Error deleting comment:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;