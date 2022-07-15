const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const CmsDetail = db.define('cmsDetail', {
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
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

CmsDetail.sync({ force: false }).then(() => {
  console.log('[Model] [CmsDetail] Synced');
});

module.exports = CmsDetail;
