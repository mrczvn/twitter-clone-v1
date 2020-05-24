import Sequelize, { Model, DataTypes } from 'sequelize';

export default class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        body: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
        post_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}
