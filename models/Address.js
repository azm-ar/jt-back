const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const Address = db.define('address', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  addressLine1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  addressLine2: {
    type: DataTypes.TEXT,
  },
  town: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  county: {
    type: DataTypes.TEXT,
  },
  postCode: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  country: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Address.sync({ force: false }).then(() => {
  console.log('[Model] [Address] synced');
});

module.exports = Address;
