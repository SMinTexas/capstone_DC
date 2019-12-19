'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.addColumn(
        'Users',
        'company_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Companies',
            key: 'id'
          },
          onDelete: 'CASCADE'
        }
      ),
      queryInterface.addColumn(
        'Users',
        'access_level_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Access_Levels',
            key: 'id'
          },
          onDelete: 'CASCADE'
        }
      )
   ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Users',
        'company_id',
      ),
      queryInterface.removeColumn(
        'Users',
        'access_level_id'
      )
    ])
  }
};
