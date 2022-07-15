const { DataTypes, UUID, UUIDV4 } = require('sequelize');
const { db } = require('../lib/db');

const Client = db.define('client', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  primaryContactName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  primaryContactNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  primaryContactEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  secondaryContactNumber: {
    type: DataTypes.STRING(255),
  },
  secondaryContactEmail: {
    type: DataTypes.STRING(255),
  },
  logo: {
    type: DataTypes.TEXT,
  },
  address: {
    type: UUID,
  },
  generalNotes: {
    type: DataTypes.TEXT,
  },
});

Client.sync({ force: false }).then(() => {
  console.log('[Model] [Client] Synced');
});

module.exports = Client;
