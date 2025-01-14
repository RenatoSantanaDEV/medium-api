const { Model, Sequelize } = require('sequelize');

class Thumbnail extends Model {
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
        tableName: 'thumbnails',
        modelName: 'Thumbnail',
        sequelize,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    Thumbnail.belongsTo(models.Post, {foreignKey: 'post_id', as: 'postThumbnail' });
  }
}

module.exports = Thumbnail;
