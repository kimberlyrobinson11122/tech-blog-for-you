// the model stores data and data related logic
// All my functions that deal with the data
// Two way communication with the data storage medium, secondary processing data

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required',
        },
        notEmpty: {
          msg: 'Title cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required',
        },
        notEmpty: {
          msg: 'Description cannot be empty',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Author is required',
        },
        notEmpty: {
          msg: 'Author cannot be empty',
        },
      },
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;


// chatgpt's answer; 
// module.exports = (sequelize, DataTypes) => {
//   const Blog = sequelize.define('Blog', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: DataTypes.STRING,
//     description: DataTypes.STRING,
//     author: DataTypes.STRING,
//     publication_date: DataTypes.DATE,
//     user_id: DataTypes.INTEGER
//   });

//   Blog.associate = function(models) {
//     Blog.hasMany(models.Comment, { foreignKey: 'blog_id' });
//   };

//   return Blog;
// };