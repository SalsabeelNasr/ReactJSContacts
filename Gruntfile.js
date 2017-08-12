'use strict';
let _ = require('lodash');

try {
  var env = require('./env.js');
} catch (err) {
  throw new Error('Please follow README and created env.js');
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/'],
    watch: {
      files: ['src/**/*', 'Gruntfile.js', 'env.js'],
      tasks: [
        'clean',
        'copy',
        'less',
        //'htmlmin',
        //'jscs',
        'browserify:development'
      ],
      options: {
        livereload: true,
      },
    },
    connect: {
      server: {
        options: {
          port: env.port,
          base: 'build',
          middleware: function(connect, options, middlewares) {
            var modRewrite = require('connect-modrewrite');
            middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.eot|\\.ttf|\\.woff|\\.woff2|\\.css|\\.jpg|\\.png$ /index.html [L]']));
            return middlewares;
          }
        }
      }
    },
    copy: {
      // fonts: {
      //   cwd: 'src/fonts',
      //   src: _.map(['eot', 'svg', 'ttf', 'otf', 'woff', 'woff2'], (ext) => '**/*.' + ext),
      //   dest: 'build/fonts',
      //   expand: true,
      // },
      // 'react-notifications/fonts': {
      //   cwd: 'node_modules/react-notifications/lib/fonts',
      //   src: _.map(['eot', 'svg', 'ttf', 'woff'], (ext) => '**/*.' + ext),
      //   dest: 'build/css/fonts',
      //   expand: true,
      // },
      // 'ionicons/fonts': {
      //   cwd: 'node_modules/ionicons/fonts',
      //   src: _.map(['eot', 'svg', 'ttf', 'woff'], (ext) => '**/*.' + ext),
      //   dest: 'build/fonts',
      //   expand: true,
      // },
      // 'fontawesome/fonts': {
      //   cwd: 'node_modules/font-awesome/fonts',
      //   src: _.map(['eot', 'svg', 'ttf', 'otf', 'woff', 'woff2'], (ext) => '**/*.' + ext),
      //   dest: 'build/fonts',
      //   expand: true,
      // },
      // images: {
      //   cwd: 'src/images',
      //   src: _.map(['jpg', 'png', 'svg'], (ext) => '**/*.' + ext),
      //   dest: 'build/images',
      //   expand: true,
      // },
      html: {
        src: 'src/index.html',
        dest: 'build/index.html',
      },
      // html: {
      //   src: 'src/index.html',
      //   dest: 'build/index.original.html',
      //   options: {
      //     process: function(content, srcpath) {
      //       var files = require('./files.js');
      //
      //       return content
      //         .replace('{js}', files.js.join('\n\t'))
      //         .replace('{css}', files.css.join('\n\t'))
      //         .replace(new RegExp('{base}', 'g'), files.base);
      //     }
      //   }
      // }
    },
    less: {
      development: {
        options: {
          paths: ['app/less/'],
          compress: true
        },
        files: {
          'build/css/app.min.css': 'src/less/index.less'
        }
      },
    },
    browserify: {
      development: {
        options: {
          transform: [[
            'babelify'
          ]],
        },
        files: {
          'build/js/app.min.js': ['src/app/app.index.js']
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-jscs');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Grunt tasks
  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    //'htmlmin',
    //'jscs',
  ]);

  //
  // grunt.registerTask('build-production', [
  //   'build',
  //   'browserify:production',
  // ]);
  //
  grunt.registerTask('build-development', [
    'build',
    'browserify:development',
  ]);

  grunt.registerTask('develope', [
    'build-development',
    'connect',
    'watch',
  ]);

  grunt.registerTask('default', [
    'develope',
  ]);
};
