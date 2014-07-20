'use strict';

var should = require('should');
var User = require('mongoose').model('User');

var user, user2;

describe('User Model Unit Tests:', function() {
  before(function(done) {
    user = new User({
      email: 'test@test.com',
      password: 'password',
    });
    user2 = new User({
      email: 'test@test.com',
      password: 'password',
    });

    done();
  });

  describe('Method Save', function() {
    it('should begin with no users', function(done) {
      User.find({}, function(err, users) {
        users.should.have.length(0);
        done();
      });
    });

    it('should be able to save without problems', function(done) {
      user.save(done);
    });

    it('should fail to save an existing user again', function(done) {
      user.save();
      return user2.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  after(function(done) {
    User.remove().exec();
    done();
  });
});
