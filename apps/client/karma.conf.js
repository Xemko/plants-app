// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter'),
      require('karma-sabarivka-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false,
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
      include: [
        // Specify include pattern(s) first
        'src/app/**/*.ts',
        // Then specify "do not touch" patterns (note `!` sign on the beginning of each statement)
        '!src/main.ts',
        '!src/**/*.spec.ts',
        '!src/**/*.module.ts',
        '!src/**/*.routes.ts',
        '!src/**/environment*.ts',
        '!src/zone-flags.ts'
      ]
    },
    reportSlowerThan: 300,
    reporters: ['spec', 'kjhtml', 'sabarivka'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: false,  // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
