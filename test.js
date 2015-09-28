var Code = require('code');   // assertion library 
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var authService = require('./');
var mysql      = require('mysql');
var config = require('./config/test')

lab.experiment('authService', function () { 
	var connection;

 
    lab.before(function (done) {
 		connection = mysql.createConnection(config.mysql);
		 
		connection.connect(done);
    });

    lab.beforeEach(function (done) {
 		connection.query('DELETE FROM users', done);
    });

    lab.after(function (done) {

		connection.end(done);

 	});



	lab.test('add user and verify auth', function (done) {

	 
		var service = authService({ db : connection});

		var user = {
			username : "alessage",
			password : "test"
		};

		function userAdded (err)
		{
	       Code.expect(err).to.equal(null);

	       var user = {
			username : "alessage",
			password : "test"
			};

		   service.verify(user,userVerified);
		}

		function userVerified(err , result)
		{
	       Code.expect(err).to.equal(null);
	       Code.expect(result).to.equal(true);

	    	done();

		}

		service.addUser(user, userAdded);

	});

	lab.test('add user and negate auth', function (done) {

	 
		var service = authService({ db : connection});

		var user = {
			username : "alessage",
			password : "test"
		};

		function userAdded (err)
		{
	       Code.expect(err).to.equal(null);

	       var user = {
			username : "alessage",
			password : "test123"
			};

		   service.verify(user,userVerified);
		}

		function userVerified(err , result)
		{
	       Code.expect(err).to.equal(null);
	       Code.expect(result).to.equal(false);

	    	done();

		}

		service.addUser(user, userAdded);

	});
});
