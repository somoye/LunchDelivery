module.exports = function (sequelize, DataTypes) {
	const model = sequelize.define('Dish', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		price: DataTypes.FLOAT
	},{
		freezeTableName: true
	});

	return model;
};