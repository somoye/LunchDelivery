const db = require('../models/db');

module.exports = {
	get: function () {
		return db.Category.findAll({
			include: [{
					model: db.Dish, as: 'dishes'
				}]
		})
	},
	add: function (category) {
		return db.Category.create(category);
	}
}