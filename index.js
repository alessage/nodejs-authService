'use strict';
var Joi = require('joi');

function authService(opts)
{

	var db = opts.db;
	var schema = Joi.object().keys({
			username: Joi.string(),
		    password: Joi.string().regex(/.{3,10}/)    
		});

	var service = {

		addUser : addUser,
		verify : verify

	}

	return service;

    function addUser(user , callback)
    {
    	var check = Joi.validate(user, schema);

		if(check.error != null) return callback(check.error);

    	db.query('INSERT INTO users SET ?', user, function(err, result) {
		  if (err) {
    		return callback(err);
    	}
		 
		  callback(null);
		});

    }

    function verify(user, callback)
    {
    	db.query('SELECT * FROM users where username = ? and password = ?', [user.username,user.password], function(err, result) {
		  if (err) {
    		return callback(err);
    	}
		 
		  callback(null, result.length == 1);
		});

    }
}

module.exports = authService;