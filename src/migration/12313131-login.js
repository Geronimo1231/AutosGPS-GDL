'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING, allowNull: false },
      correo: { type: Sequelize.STRING, unique: true, allowNull: false },
      contraseña: { type: Sequelize.STRING, allowNull: false },
      rol: {
        type: Sequelize.ENUM('adminGlobal', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      creadoEn: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios');
  }
};