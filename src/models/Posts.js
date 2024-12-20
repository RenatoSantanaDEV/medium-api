const { Model, Sequelize } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        alidate: {
          len: {
            args: [3, 20],
            msg: 'Title must be between 3 and 20 characters long',
          },
      },
    },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Text cannot be empty',
            },
      },
    },
      summary: {
        type: Sequelize.STRING,
        defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Summary must be between 3 and 255 characters long',
            },
        },
      },
      post_likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        field: 'post_likes',
      },
      post_date: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'post_date',
      },
    }, {
      sequelize,
      paranoid: true,
      timestamps: true,
      paranoid: true,
      underscored: true,
    });
  }
}

module.exports = Post;
