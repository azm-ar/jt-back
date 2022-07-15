const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const ClientJob = db.define('clientJob', {
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
  company: {
    type: DataTypes.STRING(255),
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(255),
  },
  cost: {
    type: DataTypes.FLOAT,
  },
  department: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(255),
  },
  completedDate: {
    type: DataTypes.DATEONLY,
  },
  createdDate: {
    type: DataTypes.DATEONLY,
  },
});

ClientJob.sync({ alter: false }).then(() => {
  console.log('[Model] [ClientJob] Synced');
});

module.exports = ClientJob;
