module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js'],
            options: {
                ignores:[
                    'convertor.js'
                ],
                globals: {
                    jQuery: true,
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                success: true,
                duration: 3
            }
        },
        bowercopy: {
            options: {
                clean: false
            },
            js: {
                options: {
                    destPrefix: 'public/vendor/js'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js',
                    'jquery.min.map': 'jquery/dist/jquery.min.map',
                    'jquery.form.js': 'jquery-form/jquery.form.js',
                    'materialize.min.js': 'materialize/dist/js/materialize.min.js',
                    'socket.io.min.js': 'socket.io-client/dist/socket.io.min.js',
                }
            },
            css: {
                options: {
                    destPrefix: 'public/vendor/css'
                },
                files: {
                    'materialize.min.css': 'materialize/dist/css/materialize.min.css',
                }
            },
            fonts:{
                options: {
                    destPrefix: 'public/vendor'
                },
                files: {
                    'fonts': 'materialize/dist/fonts'
                }
            }
        },
        uglify: {
            target: {
                options: {
                    sourceMap: true,
                },
                files: {
                    'public/js/script.min.js': [
                        'public/vendor/js/jquery.min.js',
                        'public/vendor/js/jquery.form.js',
                        'public/vendor/js/materialize.min.js',
                        'public/vendor/js/socket.io.min.js',
                        'public/js/script.js'
                    ]
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.registerTask('default', [
        'jshint',
        'notify_hooks',
        'bowercopy',
        'uglify'
    ]);
};
