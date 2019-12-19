'use strict';
const Company = require('./company')
const Access_Level = require('./access_levels')

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: DataTypes.STRING(50),
		password: DataTypes.STRING(50),
		access_level_id: DataTypes.INTEGER,
		company_id: DataTypes.INTEGER,
	}, {});
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};