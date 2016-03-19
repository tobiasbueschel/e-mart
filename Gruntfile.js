'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        emart: appConfig,

        php: {
            dist: {
                options: {
                    hostname: '127.0.0.1',
                    port: 9000,
                    base: 'dist', // Project root
                    keepalive: false,
                    open: false
                }
            },
            app: {
                options: {
                    hostname: '127.0.0.1',
                    port: 9000,
                    base: 'app', // Project root
                    keepalive: false,
                    open: false
                }
            }
        },
        browserSync: {
            dist: {
                bsFiles: {
                    src: [
                        // Files you want to watch for changes
                        'app/less/**/*.less',
                        '<%= emart.app %>/scripts/{,*/}*.js',
                        'app/styles/*.css',
                        'app/**/*.html'
                    ]
                },
                options: {
                    proxy: '<%= php.dist.options.hostname %>:<%= php.dist.options.port %>',
                    watchTask: true,
                    notify: true,
                    open: true,
                    logLevel: 'silent',
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        },
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles']
            },
            js: {
                files: ['<%= emart.app %>/scripts/{,*/}*.js']
            }
        },
        // HERE ARE THE BUILD TASKS
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            options: { force: true },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= emart.dist %>/{,*/}*',
                        '!<%= emart.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            bower: 'app/bower_components'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            bower: {
                expand: true,
                cwd: 'bower_components',
                src: '**',
                dest: 'app/bower_components'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= emart.app %>',
                        dest: '<%= emart.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*',
                            'scripts/php/*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= emart.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= emart.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= emart.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= emart.dist %>/scripts/{,*/}*.js',
                    '<%= emart.dist %>/styles/{,*/}*.css',
                    '<%= emart.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= emart.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= emart.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');

    // PHP server task
    grunt.registerTask('php-server', [
        'clean:bower',
        'php:dist',         // Start PHP Server
        'browserSync:dist', // Using the php instance as a proxy
        'watch'             // Any other watch tasks you want to run
    ]);

    // Run live version of app
    // TODO: task is not working 100% yet
    grunt.registerTask('live', [
        'clean:server',
        'clean:bower',
        'copy:styles',
        'copy:bower',
        'php:app',         // Start PHP Server
        'browserSync:dist', // Using the php instance as a proxy
        'watch'             // Any other watch tasks you want to run
    ]);

    // Run build version of app
    grunt.registerTask('server', [
        'build',
        'php-server'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'clean:bower',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
    
    grunt.registerTask('default', [
       'live' 
    ]);


};
