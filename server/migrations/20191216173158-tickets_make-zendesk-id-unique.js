'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Tickets',
      'zendesk_id',
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      } 
    )
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.changeColumn(
    'Tickets',
    'zendesk_id',
    {
      allowNull: false,
      type: Sequelize.INTEGER,
    } 
  )
  }
};
