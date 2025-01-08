const { Model, Sequelize } = require('sequelize');

class Thumbanil extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
            type: Sequelize.STRING,
            defaultValue: '',
          },
          filename: {
            type: Sequelize.STRING,
            defaultValue: '',
          },
          url: {
            type: Sequelize.VIRTUAL,
            get() {
              return `${appConfig.url}/images/${this.getDataValue('filename')}`;
            },
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'post_likes',
        modelName: 'Likes',
        sequelize,
        timestamps: true,
        paranoid: true
      }
    );
  }

  static associate(models) {
    Thumbanil.belongsTo(models.Post, {foreignKey: 'post_id' });
  }
}

module.exports = Thumbanil;
