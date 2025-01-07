const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 20],
              msg: 'O título deve ter entre 3 e 20 caracteres.',
            },
          },
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O texto não pode estar vazio.',
            },
          },
        },
        summary: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O resumo deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        post_likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        post_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );
  }

  static associate(models) {
    Post.belongsTo(models.User, {foreignKey: 'user_id', as: 'user' });
    Post.hasMany(models.Likes, {foreignKey: 'post_id' });
  }
}

module.exports = Post;
