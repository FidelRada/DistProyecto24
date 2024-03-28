'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EstadoSolicituds', [
      {
        Nombre: "Recepcionado",
        Descripcion: "Cuando el paquete fue recepcionado",
        Token: "ec78a2015dc1624a0ab03473a2663307497dfb30adfac9850d2d22a3fbe30d8f",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Nombre: "Asignado",
        Descripcion: "Cuando el paquete es asignado a un vehiclu y un chofer despues de ser recepcionado",
        Token: "f8f79202cad362323e35c284eb13e573be3b833385773871ad29b186b1f7732c",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Nombre: "En Camino",
        Descripcion: "Cuadno Este registra salida y va en camino a su destino",
        Token: "2f549de59080ce7898106ade4286ab5d1b66224676da8aa7ce15bb7e6314b428",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Nombre: "Etregado",
        Descripcion: "Cuando ya fue entregado al consignatario",
        Token: "57aec412611be5bf9c38d3bde5777a79d08fcba87af753f0c26aa85c6ceaac55",
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
