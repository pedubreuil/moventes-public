module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        //        wiredep: {
        //
        //            task: {
        //
        //                // Point to the files that should be updated when
        //                // you run `grunt wiredep`
        //                src: '_commonhtmlhead.html',
        //
        //                options: {
        //                    // See wiredep's configuration documentation for the options
        //                    // you may pass:
        //
        //                    // https://github.com/taptapship/wiredep#configuration
        //                }
        //            }
        //        },

        prompt: {
            askImagemin: {
                options: {
                    questions: [
                        {
                            config: 'doImagemin', // arbitrary name or config for any other grunt task
                            type: 'confirm', // list, checkbox, confirm, input, password
                            message: 'Are there new images in "img/" ?' // Question to ask the user, function needs to return a string,
                        }
                    ],
                    then: function (results, done) {
                        if (results['doImagemin']) {
                            grunt.log.write('do image min');
                            grunt.task.run('imagemin');
                        }
                    }
                }
            },
        },


        //        bower: {
        //            build: {
        //                dest: 'vendor/',
        //                css_dest:'css/vendor',
        //                js_dest:'js/vendor',
        //                fonts_dest:'dist/fonts',
        //                options: {
        //                    keepExpandedHierarchy: false,
        //                    packageSpecific: {
        //                        'components-font-awesome': {
        //                            files: [
        //                                "fonts/fontawesome-webfont.woff",
        //                                "fonts/fontawesome-webfont.woff2"
        //                            ]
        //                        }
        //                    }
        //
        //                },
        //
        //            }
        //        },
        copy: {
            forDist: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'for_dist',
                        src: ['**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        dot:true
                    },
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['**', '!vendor'],
                        dest: 'dist/css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'js',
                        src: ['**', '!vendor'],
                        dest: 'dist/js',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'img',
                        src: ['**/*.{xml,json}'],
                        dest: 'dist/img/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        //                        dot: true,
                        cwd: 'bower_components',
                        src: ['bootstrap/dist/fonts/*.*', 'components-font-awesome/fonts/*.*'], //,'google-fonts/ofl/**/*.ttf'
                        dest: 'dist/fonts/',
                        flatten: true,
                        filter: 'isFile'
                    },
                ],

            }
        },
        bower_concat: {

            all: {
                dest: {
                    'js': 'dist/js/_bower.js',
                    'css': 'dist/css/_bower.css'
                },
                //    exclude: [
                //      'jquery',
                //      'modernizr'
                //    ],
                //    dependencies: {
                //      'underscore': 'jquery',
                //      'backbone': 'underscore',
                //      'jquery-mousewheel': 'jquery'
                //    },
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    'bootstrap': ['dist/css/bootstrap.css', 'dist/js/bootstrap.js'],
                }

            }

            // https://www.npmjs.com/package/grunt-bower-concat
            //            all: {
            //                dest: 'dist/js/_bower.js',
            //                cssDest: 'dist/css/_bower.css',
            //                bowerOptions: {
            //                    //      relative: false
            //                },
            //                mainFiles: {
            //                    'bootstrap': ['dist/css/bootstrap.css', 'dist/js/bootstrap.js'],
            //                }
            //
            //            }
        },

        /* --------------------------------------
        -------- optim CSS  ---------------- */
        //1. uncss
        //2. cssmin
        //3. processhtml

        uncss: {
            dist: {
                options: {
                    ignore: [
                        '.nav-over-header',
                        /.*cc-cookies.*/,
                        '.btn-danger', '.btn-xs',
                        /.*navbar.*/, /.*collapse.*/,
                        '.nav-tabs',
                        /.*tooltip.*/,
                        /.*bv-.*/, /.*has-.*/, /.*form-.*/, /.*input-.*/, '.help-block', '.glyphicon-remove', '.glyphicon-ok', '.btn[disabled]',
                        '.alert-danger', '.alert', '.alert-success',
                        /.*modal*/, /.*fade*/, '.b-loaded', /.*animated.*/
                    ],
                    ignoreSheets: [/fonts.googleapis/],
                    report: 'min'

                },
                files: {
                    'dist/css/moventes.full.css': ['dist/*.html']
                }
            }
        },

        cssmin: {
            options: {
                //                shorthandCompacting: false,
                //                roundingPrecision: -1,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

                report: 'min'
                    //                ,sourceMap:true

            },
            build: {
                files: {
                    'dist/css/moventes.min.css': ['dist/css/moventes.full.css']
                }
            }
        },


        /* --------------------------------------
        -------- optim JS  ---------------- */
        //1. uglify
        //2. processhtml

        uglify: {
            build: {
                'files': {
                    'dist/js/moventes.min.js': ['dist/js/_bower.js', 'js/*.js', '!js/vendor'],
                },
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    compress: true,
                    report: 'min',
                    sourceMap: true,
                    preserveComments: false,
                    mangle: {
                        except: ['jQuery']
                    }

                },
            }
        },

        // -------------- PROCESS HTML
        processhtml: {
            inc: {
                options: {
                    process: true,
                    recursive: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['*.html', '!_*.html'],
                        dest: 'dist/',
                        ext: '.html'
                    },
                ]
            },
            bower: {
                options: {
                    process: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['dist/*.html'],
                        ext: '.html'
                    },
                ],
            },

            prod: {
                options: {
                    process: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['dist/*.html'],
                        ext: '.html'
                    },
                ],
            },

        },


        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: 'dist/img'
                }]
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    removeIgnored: true,
                    minifyJS: true,
                    minifyCSS: true

                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },


        watch: {
            jsFiles: {
                files: ['js/{,*/}*.js', '!js/vendor'],
                tasks: ['copy:forDist'],
                options: {
                    event: ['changed'],
                    //                    livereload: true,

                },
            },
            depFilesExistence: {
                files: ['js/{,*/}*.js', '!js/vendor', 'css/*.css', '!css/vendor'],
                tasks: ['processhtml:inc', 'copy:forDist', 'processhtml:bower'],
                options: {
                    event: ['added', 'deleted'],
                    //                    livereload: true,

                },

            },
            htmlFiles: {
                files: ['*.html'],
                tasks: ['processhtml:inc', 'copy:forDist', 'processhtml:bower'],
                options: {
                    event: ['all'],
                    //                    livereload: true,

                },
            },
            cssFiles: {
                files: ['css/*.css', '!css/vendor'],
                tasks: ['copy:forDist'],
                options: {
                    event: ['changed'],
                    //                    livereload: true,

                },
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            bower: {
                files: ['bower.json'],
                tasks: ['processBowerDep']
            },
        },
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //    grunt.loadNpmTasks('grunt-local-googlefont');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-concat');

    // Default task(s).
    grunt.registerTask('filesToDist', ['processhtml:inc', 'prompt:askImagemin', 'copy:forDist']);

    grunt.registerTask('processBowerDep', [ /*'wiredep',*/ 'bower_concat', 'processhtml:bower']);

    grunt.registerTask('optimJsCss', ['uncss', 'cssmin', 'uglify', 'processhtml:prod']);


    grunt.registerTask('dev', ['filesToDist', 'processBowerDep', 'watch']);

    grunt.registerTask('default', ['filesToDist', 'processBowerDep', 'optimJsCss', 'htmlmin']);




};
