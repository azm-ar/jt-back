const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const FtpDetail = db.define('ftpDetail', {
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
  ftpAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hostDirectory: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  login: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

FtpDetail.sync({ force: false }).then(() => {
  console.log('[Model] [FtpDetail] Synced');
});

module.exports = FtpDetail;
