import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'auth',
    userName: Ember.computed.alias('controllers.auth.model.name'),
});
