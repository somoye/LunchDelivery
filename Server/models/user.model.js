'use strict';
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		name: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING
	}, {
		freezeTableName: true,
		classMethods: {
			associate: function (db) {
				db.User.hasMany(db.Order, {
					as: 'orders',
					foreignKey: { name: 'userId', allowNull: false },
					onDelete: 'CASCADE'
				});
			}
		}
	});
	return User;
};