const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const OtherClientDetail = db.define('otherClientDetail', {
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
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

OtherClientDetail.sync({ force: false }).then(() => {
  console.log('[Model] [OtherClientDetail] Synced');
});

module.exports = OtherClientDetail;
