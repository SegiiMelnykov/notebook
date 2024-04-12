const data = require('./data.json');

module.exports = {
  async up (queryInterface, Sequelize) {

    const languages = []
    let date = new Date()
    data.languages.forEach(lang => {
        languages.push({
          code:  lang.code,
          name: lang.name,
          nativeName: lang.nativeName,
          createdAt: date,
          updatedAt: date
        })
    });
    
    await queryInterface.bulkInsert('languages', languages, {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('languages', null, {});
  }
};
