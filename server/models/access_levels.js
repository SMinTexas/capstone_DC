'use strict';
module.exports = (sequelize, DataTypes) => {
	const Access_Levels = sequelize.define('Access_Levels', {
		access_desc: DataTypes.STRING(50)
	}, {});
	Access_Levels.associate = function(models) {
	};
	return Access_Levels;
};