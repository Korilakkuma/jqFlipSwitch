module.exports = function(grunt) {
    'use strict';

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['build/jquery.jqflipswitch.js'],
            options: {
                jshintrc: true
            }
        },
        qunit: {
            files: ['test/private/*.html', 'test/public/*.html']
        },
        uglify: {
            target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'build/jquery.jqflipswitch.js.map'
                },
                files: {
                    'build/jquery.jqflipswitch.min.js': ['build/jquery.jqflipswitch.js']
                }
            }
        },
        watch: {
            files: ['build/jquery.jqflipswitch.js'],
            tasks: ['uglify']
            /*
            options: {
                livereload: true
            }
            */
        },
        clean: ['build/*.min.js', 'build/*.map']
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Tasks
    grunt.registerTask('hint',    ['jshint']);
    grunt.registerTask('test',    ['qunit']);
    grunt.registerTask('build',   ['clean', 'uglify']);
    grunt.registerTask('observe', ['watch']);
    grunt.registerTask('default', ['hint', 'test', 'build']);
};
