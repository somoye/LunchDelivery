'use strict';
const db = require('../models/db');
module.exports = {
	up: function (queryInterface, Sequelize) {
		return Promise.all(require('./seeds/menu.seed.js')
				.categories.map(categoryToSave =>
					db.Category.create(categoryToSave)
					.then(category =>
						Promise.all(categoryToSave.dishes.map(dish => db.Dish.create(dish)))
						.then(dishes => category.setDishes(dishes))
					)))
			.then(() => Promise.all(
				require('./seeds/user.seed.js')
				.users.map(user => db.User.create(user))))
			.then(() => db.Order.create({
				date: new Date().setUTCHours(0, 0, 0, 0),
				UserId: 1,
				dishId: 1,
				amount: 1
			}))
			.then(() => db.Order.create({
				date: new Date().setUTCHours(0, 0, 0, 0),
				UserId: 1,
				dishId: 2,
				amount: 2
			}));
		//			.catch(err => console.log('catch', err.toString()) || err)
		//			.then(() => {
		//				throw {
		//					message: 'Forcibly end the seeding'
		//				};
		//			});
	},
	down: function (queryInterface, Sequelize) {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.

		  Example:
		  return queryInterface.bulkDelete('Person', null, {});
		*/
	}
};