module.exports = function (sequelize, DataTypes) {
	const model = sequelize.define('Category', {
		name: DataTypes.STRING,
		image: DataTypes.STRING
	}, {
		freezeTableName: true,
		classMethods: {
			associate: (db) => {
				db.Category.hasMany(db.Dish, {
					as: 'dishes'
				});
			}
		}
	});

	return model;
};