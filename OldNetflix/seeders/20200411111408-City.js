'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', [
      {
        city: "Albacete",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Alicante",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Almeria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "	Ávila",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Badajoz",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Barcelona",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Bilbao",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Burgos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Castellon",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Ciudad Real",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Cuenca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Cáceres",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Cádiz",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Córdoba",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Gerona",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Granada",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Guadalajara",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Huelva",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Huesca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Jaén",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "La Coruña",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Las Palmas de Gran Canaria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "León",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Logroño",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Lugo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Lérida",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Madrid",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "	Murcia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Málaga",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Orense",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Oviedo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Palencia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Palma de Mallorca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Pamplona",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Pontevedra",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Salamanca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "San Sebastián",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Santa Cruz de Tenerife",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Santander",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Segovia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Sevilla",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Soria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Tarragona",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Teruel",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Toledo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Valencia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Valladolid",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Vitoria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Zamora",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: "Zaragoza",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
