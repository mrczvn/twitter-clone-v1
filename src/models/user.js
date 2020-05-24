import Sequelize, { Model, DataTypes } from 'sequelize';
import { hashSync, compareSync } from 'bcryptjs';
export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      }
    );
    this.addHook('beforeCreate', (user) => {
      return user.set('password', hashSync(user.password, 8));
    });

    return this;
  }
  static isPassword(encodedPassword, password) {
    return compareSync(password, encodedPassword);
  }

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    this.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
  }
}
