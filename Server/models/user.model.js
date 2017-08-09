'use strict';
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		name: { type: DataTypes.STRING(20), 
				allowNull: false,
		 validate: { min: 2, max:20, isAlpha: true }},

		lastName: { type: DataTypes.STRING(20), 
			allowNull: false,
		 validate: { min: 2, max:20, isAlpha: true }},

		email:{ type: DataTypes.STRING(50), 
			allowNull: false,			 
			 validate: {len: [2,50], isEmail: true}			},
			
		isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
		},	{
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


