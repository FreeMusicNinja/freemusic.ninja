import Ember from 'ember';

export default Ember.Controller.extend({
  donors: [
    {
      name: "Trey Hunner",
      url: "http://treyhunner.com",
      photo: "https://secure.gravatar.com/avatar/945d10168a7817c64276c164a57fa8de?s=176",
      about: new Handlebars.SafeString("Trey is a web developer, open source advocate, volunteer teacher, and music fan.  Trey has been interested in Creative Commons licenses since 2004.  He accepts donations via Bitcoin at <a href='https://blockchain.info/address/16CSbbHmcTBFZmgGLrrfznqKGb84qj4LAY'>16CSbbHmcTBFZmgGLrrfznqKGb84qj4LAY</a>."),
      donated: [
        "" + (200 + 79) + " hours on researching, designing, and developing Free Music Ninja", // Estimated 200 hours spent before I started keeping track
        "38 on hosting and domains for Free Music Ninja",
        "547 on Creative Commons music",
      ]
    },
    {
      name: "Micah Denbraver",
      url: "http://micah.bigprob.net/",
      photo: "https://secure.gravatar.com/avatar/eb59b178eaed24f45ae1946169d368fa?s=176",
      about: "Micah is an open source enthusiast and Python web application developer.",
      donated: [
        "" + 7 + " hours developing and testing the API",
      ]
    }
  ]
});
