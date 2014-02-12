'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      }
    },
    mochacli: {
      options: {
        require: ['chai', 'mockery'],
        reporter: 'spec',
        timeout: 6000
      },
      backend: {
        options: {
          files: ['test/unit-backend/all.js', 'test/unit-backend/**/*.js']
        }
      },
      midway: {
        options: {
          files: ['test/midway-backend/all.js', 'test/midway-backend/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('test-unit-backend', 'run the backend unit tests', ['test-backend-prepare', 'mochacli:backend']);
  grunt.registerTask('test-midway-backend', 'run midway tests', ['test-backend-prepare', 'mochacli:midway']);
  grunt.registerTask('test-backend', 'run both the unit & midway tests', ['test-unit-backend', 'test-midway-backend']);

  grunt.registerTask('test-backend-prepare', 'prepare tests environment', function() {
    var done = this.async();

    process.env.NODE_ENV = 'test';

    var child = require('child_process').spawn('sh', ['./scripts/prepare-backend-tests-environment.sh']);

    child.stdout.on('data', function(chunk) { grunt.log.write(chunk); });
    child.stderr.on('data', function(chunk) { grunt.log.error(chunk); });
    child.on('close', function(code) { done(code ? false : true); });
  });

  grunt.registerTask('test-frontend', 'run the FrontEnd tests', function() {
    var done = this.async();

    var child = require('child_process').spawn('karma', ['start', '--browsers', 'PhantomJS', './test/config/karma.conf.js']);

    child.stdout.on('data', function(chunk) { grunt.log.write(chunk); });
    child.stderr.on('data', function(chunk) { grunt.log.error(chunk); });
    child.on('close', function(code) { done(code ? false : true); });
  });

  grunt.registerTask('test-frontend-all', 'run the FrontEnd tests on all possible browsers', function() {
    var done = this.async();

    var child = require('child_process').spawn('karma', ['start', '--browsers', 'PhantomJS,Firefox,Chrome', './test/config/karma.conf.js']);

    child.stdout.on('data', function(chunk) { grunt.log.write(chunk); });
    child.stderr.on('data', function(chunk) { grunt.log.error(chunk); });
    child.on('close', function(code) { done(code ? false : true); });
  });
  grunt.registerTask('test', ['test-backend', 'test-frontend']);
  grunt.registerTask('default', ['test']);
};
