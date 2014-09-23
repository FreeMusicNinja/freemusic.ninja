/* jshint node: true */
// Based on http://www.octolabs.com/blogs/octoblog/2014/05/24/deploying-ember-cli-to-amazon-s3-with-grunt/

module.exports = function(grunt) {

  grunt.initConfig({

    aws: {
      AWSAccessKeyId: process.env.AWS_KEY,
      AWSSecretKey: process.env.AWS_SECRET,
    },

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        bucket: '<%= aws.bucket %>',
        params: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          CacheControl: "max-age=630720000, public",
          Expires: new Date(Date.now() + 63072000000),
        },
      },
      production: {
        options: {
          bucket: 'freemusic.ninja',
        },
        files: [
          {
            src: 'dist/index.html',
            dest: 'index.html',
            options: {
              params: {
                // 1 minute cache policy (1000 * 60)
                CacheControl: "max-age=60000, public",
                Expires: new Date(Date.now() + 60000),
              },
            },
          },
          {
            expand: true,
            cwd: 'dist/assets/',
            src: ['**'],
            dest: 'assets/'
          },
          {
            expand: true,
            cwd: 'dist/fonts/',
            src: ['**'],
            dest: 'fonts/'
          },
        ],

      },

    },

    hashres: {
      production: {
        src: [
          'dist/assets/app.js',
          'dist/assets/vendor.css',
          'dist/assets/app.css'
        ],
        dest: 'dist/index.html',
      },
    }, // end hashres
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-hashres');

  // Default task(s).
  grunt.registerTask('default', ['hashres','aws_s3']);

};
