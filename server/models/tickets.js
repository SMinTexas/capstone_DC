'use strict';
module.exports = (sequelize, DataTypes) => {
	const Tickets = sequelize.define('Tickets', {
		zendesk_id: DataTypes.INTEGER,
		subject: DataTypes.STRING,
		description: DataTypes.STRING,
		priority: DataTypes.STRING,
		status: DataTypes.STRING,
		reportNum: DataTypes.STRING,
		classification: DataTypes.STRING,
		incidentDate: DataTypes.DATE,
		platform: DataTypes.STRING,
		bopxTech: DataTypes.STRING,
		custContact: DataTypes.STRING,
		resolution: DataTypes.STRING,
		approveDate: DataTypes.DATE,
		company_id: DataTypes.INTEGER,
	}, {});
	Tickets.associate = function(models) {
		// associations can be defined here
	};
	return Tickets;
};