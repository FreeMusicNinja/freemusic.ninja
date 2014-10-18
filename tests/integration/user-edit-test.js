import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

function mockEditResponse(data) {
  data.id = 1;
  $.mockjax({
    url: 'http://api/users/1/',
    contentType: 'application/json',
    responseText: data,
  });
}

module("Tests for user edit page", {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test("edit artist name", function() {
  expect(2);
  mockEditResponse({name: "Bob", email: "bob@example.com"});
  visit('/users/1/edit').then(function() {
    fillIn('#name', 'Bob');
    fillIn('#email', 'bob@example.com.com');
    click('[type=submit]');
  });

  andThen(function () {
    equal(currentPath(), 'user.index');
    equal(find('h1').text(), "Bob User Profile");
  });
});
