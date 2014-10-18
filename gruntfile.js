/* jshint node: true */
// Based on http://www.octolabs.com/blogs/octoblog/2014/05/24/deploying-ember-cli-to-amazon-s3-with-grunt/
var shell = require('shelljs');

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
          ContentEncoding: 'gzip',
        },
      },
      production: {
        options: {
          bucket: 'freemusic.ninja',
        },
        files: [
          {
            src: 'compressed/index.html',
            dest: 'index.html',
            params: {
              // 1 minute cache policy (1000 * 60)
              CacheControl: "max-age=60000, public",
              Expires: new Date(Date.now() + 60000),
            },
          },
          {
            expand: true,
            cwd: 'compressed/assets/',
            src: ['**'],
            dest: 'assets/',
            params: {
              // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
              CacheControl: "max-age=630720000, public",
              Expires: new Date(Date.now() + 63072000000),
            },
          },
          {
            expand: true,
            cwd: 'compressed/fonts/',
            src: ['**'],
            dest: 'fonts/',
            params: {
              // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
              CacheControl: "max-age=630720000, public",
              Expires: new Date(Date.now() + 63072000000),
            },
          },
        ],

      },

    },

    compress: {
      production: {
        options: {
          mode: 'gzip',
        },
        files: [
          {
            expand: true,
            cwd: "dist/",
            src: ['**'],
            dest: 'compressed/',
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
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('build', "build production assets", function() {
    shell.exec('rm -rf compressed/ && ember build --environment=production');
  });

  // Default task(s).
  grunt.registerTask('default', ['build', 'hashres', 'compress', 'aws_s3']);

};
