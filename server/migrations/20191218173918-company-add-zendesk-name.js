'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    'Companies',
    'zendeskName',
    {
      type:Sequelize.STRING,
      allowNull:true,
      
    }
   )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn(
     'Companies',
     'zendeskName'
   )
  }
};
