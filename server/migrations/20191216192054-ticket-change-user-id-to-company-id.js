'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Tickets',
        'user_id'
      ),
      queryInterface.addColumn(
        'Tickets',
        'company_id',
        {
          allowNull: false,
          type:Sequelize.INTEGER,
          references: {
            model: 'Companies',
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
        'Tickets',
        'company_id'
      ),
      queryInterface.addColumn(
        'Tickets',
        'user_id',
        {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          },
          onDelete: 'CASCADE'
        }
      )
    ])
  }
};
