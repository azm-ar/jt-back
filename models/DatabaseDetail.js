const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const DatabaseDetail = db.define('databaseDetail', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  clientId: {
    type: UUID,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  databaseName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

DatabaseDetail.sync({ force: false }).then(() => {
  console.log('[Model] [DatabaseDetail] Synced');
});

module.exports = DatabaseDetail;
