'use strict';
module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define('Company', {
		company_name: DataTypes.STRING,
		zendeskName: DataTypes.STRING,
	}, {});
	Company.associate = function(models) {
		// associations can be defined here
	};
	return Company;
};