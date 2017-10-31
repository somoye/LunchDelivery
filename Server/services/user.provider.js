const db = require('../models/db');
const errors = require('./errors/errors');

module.exports = {
	get: function () {
		return db.User.findAll({			
		})
	},

	getById: function (userId) {
		return db.User.findById(userId).then(user =>
			user || Promise.reject(new errors.NotFound("User is not found")));
	},

	add: function (user) {
		return db.User.create(user).catch(err =>
			Promise.reject(new errors.BadRequest("Validation error (Please check your input)"))
		);
			
					
	},

	update: function (propsToUpdate) {
		return db.User.findById(propsToUpdate.id).then(user => user
			? Object.assign(user).update(propsToUpdate).catch(err => err instanceof db.Sequelize.ValidationError
				/*проверить на ерор */
				/*? Promise.reject(new errors.BadRequest("Validation error (Please check your input)"))*/
				? (err instanceof db.Sequelize.UniqueConstraintError 
					? Promise.reject(new errors.BadRequest("UniqueConstraintError)"))
					: Promise.reject(new errors.BadRequest("Validation error (Please check your input)")))
				: Promise.reject(err))				
			: Promise.reject(new errors.NotFound("User is not found")));
		
	},
	
	delete: function (id) {
		return db.User.destroy({
			where: {id: id }
		});
	}
}
