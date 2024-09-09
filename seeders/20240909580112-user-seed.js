'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = (password) => bcrypt.hash(password, saltRounds);

    await queryInterface.bulkInsert('Users', [{
      username: 'oscar',
      password: await hashedPassword('oscar17X'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'admin',
      password: await hashedPassword('admin17X'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'google',
      password: await hashedPassword('google17X'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'oscar' }, {});
  }
};
