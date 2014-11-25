module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // load all tasks
  require('time-grunt')(grunt); // only include this if you have added time-grunt in package.json

  // Include only what you want! No trailing ","!
  var jsJquery = [
    'bower_components/foundation/js/vendor/jquery.js'
  ];

  var jsLibs = [
    // 'bower_components/foundation/js/vendor/modernizr.js', // updated - include modernizr separately at <head> and move the rest of [jsLibs] to before </body> for better page load 
    'bower_components/foundation/js/vendor/jquery.cookie.js',
    'bower_components/foundation/js/vendor/placeholder.js',
    'bower_components/foundation/js/vendor/fastclick.js'
  ];

  // Include only what you want! No trailing ","!
  var jsFoundation = [
    'bower_components/foundation/js/foundation/foundation.js',
    'bower_components/foundation/js/foundation/foundation.abide.js',
    'bower_components/foundation/js/foundation/foundation.accordion.js',
    'bower_components/foundation/js/foundation/foundation.alert.js',
    'bower_components/foundation/js/foundation/foundation.clearing.js',
    'bower_components/foundation/js/foundation/foundation.dropdown.js',
    'bower_components/foundation/js/foundation/foundation.equalizer.js',
    'bower_components/foundation/js/foundation/foundation.interchange.js',
    'bower_components/foundation/js/foundation/foundation.joyride.js',
    'bower_components/foundation/js/foundation/foundation.magellan.js',
    'bower_components/foundation/js/foundation/foundation.offcanvas.js',
    'bower_components/foundation/js/foundation/foundation.orbit.js',
    'bower_components/foundation/js/foundation/foundation.reveal.js',
    'bower_components/foundation/js/foundation/foundation.slider.js',
    'bower_components/foundation/js/foundation/foundation.tab.js',
    'bower_components/foundation/js/foundation/foundation.tooltip.js',
    'bower_components/foundation/js/foundation/foundation.topbar.js'
  ];

  var jsModernizr = [
    'bower_components/modernizr/modernizr.js'
  ];

  // Your custom javascript files. No trailing ","!
  var jsApp = [
    'js/app.js',
    'js/_*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss'],
        sourceMap: true
      },
      dev: {
          options: {
          outputStyle: 'expanded'
        },
        files: {
          'css/<%= pkg.name %>.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/<%= pkg.name %>.min.css': 'scss/app.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        jsApp
      ]
    },

    uglify: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'js/libs/jquery.min.js': [jsJquery],
          'js/libs/libs.min.js': [jsLibs],
          'js/libs/foundation.min.js': [jsFoundation],
          'js/app.min.js': [jsApp],
          'js/libs/modernizr.min.js': [jsModernizr]
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },

      js: {
        files: [
          jsLibs,
          jsFoundation,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },

      livereload: {
        options: {
          livereload: true
        },
        files: [
          'js/app.min.js',
          'css/app.css',
          'css/app.min.css',
          '*.php'
        ]
      }
    }
  });

/*
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','watch']);
*/

  grunt.registerTask('build', [
    'jshint',
    'uglify',
    'sass'
  ]);
};