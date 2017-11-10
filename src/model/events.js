import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

export const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.TEXT,
  dates: DataTypes.ARRAY(DataTypes.STRING),
});

export const Vote = sequelize.define('Vote', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: DataTypes.DATEONLY,
  person: DataTypes.STRING,
});

Event.hasMany(Vote, { as: 'votes' });

Event.sync({ force: false })
  .then(() => Vote.sync({ force: false }));
