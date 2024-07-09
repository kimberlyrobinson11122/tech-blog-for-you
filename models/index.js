const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User has many Blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Blog belongs to User
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

// Blog has many Comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

// Comment belongs to Blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };