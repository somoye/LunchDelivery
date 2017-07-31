module.exports = function (sequelize, DataTypes) {
	const model = sequelize.define('Category', {
		name: DataTypes.STRING,
		imageUrl: {
			type: DataTypes.VIRTUAL,
			get: function(){
				return 'http://localhost:3001/categories/' + this.getDataValue('id') + '/images/default'
			}
		}
	}, {
		freezeTableName: true,
		classMethods: {
			associate: (db) => {
				db.Category.hasMany(db.Dish, {
					as: 'dishes',
					foreignKey: { name: 'categoryId', allowNull: false }
				});
			}
		}
	});

	return model;
};