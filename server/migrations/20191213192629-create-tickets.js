'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tickets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            zendesk_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            subject: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            priority: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            reportNum: {
                type: Sequelize.STRING
            },
            classification: {
                type: Sequelize.STRING
            },
            incidentDate: {
                type: Sequelize.DATE
            },
            platform: {
                type: Sequelize.STRING
            },
            bopxTech: {
                type: Sequelize.STRING
            },
            custContact: {
                type: Sequelize.STRING
            },
            resolution: {
                type: Sequelize.STRING
            },
            approveDate: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tickets');
    }
};