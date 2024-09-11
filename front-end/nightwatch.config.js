module.exports = {
  src_folders: ['tests'], // Folder where your tests are located
  webdriver: {
    start_process: true,
    server_path: '/Users/leo/Tools/chromedriver',
    port: 9515,
  },
  test_workers: {
    enabled: true,
    workers: 'auto',
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--no-sandbox', '--disable-dev-shm-usage'],
        },
      },
      globals: {
        waitForConditionTimeout: 10000,
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_success: false,
        path: 'screenshots'
      },
      output_folder: 'reports',
    },
  },
};

