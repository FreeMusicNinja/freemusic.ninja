import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

moduleForModel('user', "Tests for user profile page", {
  needs: ['model:user'],
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test("edit button for current user", function() {
  expect(1);
  var store = this.store();
  var user = {
    id: 1,
    name: "Trey",
    email: "trey@example.com",
  };
  Ember.run(function () {
    store.push('user', user);
  });
  this.subject().set('controllers.auth.content', user);
  visit('/users/1/').then(function() {
    equal(find('.page-header a').text(), "Edit Profile");
  });
});
