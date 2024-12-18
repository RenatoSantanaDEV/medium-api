const { Model, Sequelize } = require('sequelize');

class Like extends Model {
  static init(sequelize) {
    super.init(
      {
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
      },
      {
        tableName: 'post_likes',
        modelName: 'Likes',
        sequelize,
        timestamps: true,
        paranoid: true
      }
    );
  }

  static associate(models) {
    Like.belongsTo(models.Post, {foreignKey: 'post_id' });
    Like.belongsTo(models.User, {foreignKey: 'user_id' });
  }
}

module.exports = Like;