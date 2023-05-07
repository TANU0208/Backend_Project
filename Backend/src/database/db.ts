import { Sequelize } from 'sequelize';
import { config } from '../config';

const sequelize = require('sequelize');

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

export { db, sequelize };
