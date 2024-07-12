const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const { user_id, comment_text, blog_id } = req.body; // Destructure the required fields from req.body

        const newComment = await Comment.create({
            user_id,
            comment_text,
            blog_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error('Error creating comment:', err.message);
        res.status(400).json({ error: 'Failed to create comment' });
    }
});

// DELETE comment
router.delete('/:id', withAuth, async (req, res) => {
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
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;