'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Clientes', [
      {
        Telefono: "60910990",
        NIT: "9811914",
        IdPersona: "2",
        Token: "80a5b5f0e8080f674e1ac80656f94003efd450dd52fa5b1b409d59c6d6df8b3b",
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        Telefono: "70932556",
        NIT: "12345678",
        IdPersona: "3",
        Token: "51f2ba8dc9a5c49d3944b9868091661bf28715d11820e73800ec169fff12e15e",
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
