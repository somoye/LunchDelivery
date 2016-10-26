'use strict';
module.exports = function (sequelize, DataTypes) {
	var Order = sequelize.define('Order', {
		date: DataTypes.DATE
	}, {
		freezeTableName: true,
		classMethods: {
			associate: (db) => {
			}
		}
	});
	return Order;
};