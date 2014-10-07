import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['auth'],
    userNameBinding: 'controllers.auth.content.name'
});
