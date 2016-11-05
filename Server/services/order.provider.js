const db = require('../models/db');

module.exports = {
	get: function (userId) {
		return db.Order.findAll({
			where: {
				UserId: userId,
				date: new Date().setUTCHours(0, 0, 0, 0)
			},
			include: [{
				all: true // model: db.Dish, as: 'dish'
				}]
		})
	},
	add: function (userId, dishId) {
		return db.Order.findOrCreate({
				where: {
					UserId: userId,
					dishId: dishId,
					date: new Date().setUTCHours(0, 0, 0, 0)
				},
				defaults: {
					UserId: userId,
					dishId: dishId,
					amount: 1
				}
			})
			.spread((order, created) => created ? order : Object.assign(order, {
				amount: order.amount + 1
			}).save());
	}
}