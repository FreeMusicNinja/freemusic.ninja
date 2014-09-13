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
      user.password.should.equal('password');
      user.save(function () {
        user.password.should.not.equal('password');  // Password hashed now
        done();
      });
    });

    it('should return error on incorrect password', function(done) {
      user.comparePassword('incorrect', function (err, isMatch) {
        (err === null).should.equal(true);
        isMatch.should.equal(false);
        done();
      });
    });

    it('should return success on correct password', function(done) {
      user.comparePassword('password', function (err, isMatch) {
        (err === null).should.equal(true);
        isMatch.should.equal(true);
        done();
      });
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
