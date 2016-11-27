const db = require('../models/db');
const errors = require('./errors/errors');

module.exports = {
	get: function () {
		return db.Category.findAll({
			include: [{
				model: db.Dish, as: 'dishes'
			}]
		})
	},

	getById: function (categoryId) {
		return db.Category.findById(categoryId).then(category =>
			category || Promise.reject(new errors.NotFound("Order is not found")));
	},

	add: function (category) {
		return db.Category.create(category);
	},

	update: function (propsToUpdate) {
		return db.Category.findById(propsToUpdate.id).then(category => category
			? Object.assign(category).update(propsToUpdate)
			: Promise.reject(errors.NotFound("Category is not found"))
		);
	},

	delete: function (id) {
		return db.Category.destroy({
			where: { id: id }
		});
	}
}