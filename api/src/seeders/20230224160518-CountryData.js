const  data = require('./data.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const countries = []
    let date = new Date()
    data.countries.forEach(country => {
      countries.push({
          name: country.name,
          iso: country.iso,
          code: country.code,
          createdAt: date,
          updatedAt: date
        })
    });
    
    await queryInterface.bulkInsert('countries', countries, {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('countries', null, {});
  }
};
