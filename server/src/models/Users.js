const { Model, Sequelize } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'invalid Email',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
      },
    }, {
      sequelize,
      paranoid: true
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) { user.password_hash = await bcryptjs.hash(user.password, 8); }
    });

    return this;
  }

  static associate(models) {
    console.log(models, 'models')

    User.hasMany(models.Likes, {foreignKey: 'user_id' });
    User.hasMany(models.Post, {foreignKey: 'user_id' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

module.exports = User;