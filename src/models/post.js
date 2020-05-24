import Sequelize, { Model, DataTypes } from 'sequelize';

export default class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        body: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
  }
}
