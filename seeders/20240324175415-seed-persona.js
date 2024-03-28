'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Personas', [
      {
        Nombre: "Andres Fidel",
        ApellidoPaterno: "Rada",
        ApellidoMaterno: "Rojas",
        CI: "9800014",
        Token: "47a21490991ddabc5d37b71daed3a241eae86939f28d10c709b72b5f46302cd6",
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        Nombre: "Gabriel",
        ApellidoPaterno: "Rojas",
        ApellidoMaterno: "Saravia",
        CI: "8800014",
        Token: "c35cf19dd77a63b7f56d71b0591078e475ba1dfc4ccb9994dd19b3a0b2f90bbb",
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
