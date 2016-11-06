const db = require('../models/db');

module.exports = {
	get: function (userId) {
		let whereClause = {
				date: new Date(new Date().setHours(0, 0, 0, 0))
			};
		if(userId)
			whereClause.UserId =  userId;

		return db.Order.findAll({
			where: whereClause,
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
					date: new Date(new Date().setHours(0, 0, 0, 0))
				},
				defaults: {
					UserId: userId,
					dishId: dishId,
					date: new Date(new Date().setHours(0, 0, 0, 0)),
					amount: 1
				}
			})
			.spread((order, created) => created ? order : Object.assign(order, {
				amount: order.amount + 1
			}).save());
	}
}