import Sequelize from 'sequelize';
import config from '../config/database';
import { join } from 'path';
import { readdirSync } from 'fs';

const connect = async () => {
  const connection = new Sequelize(config);
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
  loadModels(connection);
};

const loadModels = (connection) => {
  const dir = join(__dirname, '../models');
  const models = readdirSync(dir).map((file) => require(`${dir}/${file}`));

  models.forEach((obj) => {
    Object.values(obj).forEach((model) => model.init(connection));
  });
  models.forEach((obj) => {
    Object.values(obj).forEach(
      (model) => model.associate && model.associate(connection.models)
    );
  });
};

export default connect();
