'use strict';
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		name: { type: DataTypes.STRING, 
				allowNull: false,
		 validate: { min: 2, max:20, is: ["^[a-z]+$",'i'] }},

		lastName: { type: DataTypes.STRING, 
			allowNull: false,
		 validate: { min: 2, max:20, is: ["^[a-z]+$",'i'] }},

		email:{ type: DataTypes.STRING, 
			allowNull: false,			 
			 validate: {len: [2,50], isEmail: true},
			 unique : true},
			
		isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		userPasswd: {type: DataTypes.STRING, allowNull: false, len: [2,50]} 
		},	
		
		{instanceMethods: {
			  toJSON: function () {
				var values = Object.assign({},
					 this.get());		  
				delete values.userPasswd;
				return values;
			  }}},
			
		{freezeTableName: true,
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


	/*sequelize.define('user', attributes, {
		instanceMethods: {
		  toJSON: function () {
			var values = Object.assign({}, this.get());
	  
			delete values.password;
			return values;
		  }
		}*/