// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).
// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

const path = require('path');


const defaults = {
  mail: {},
  server: {
    host: '127.0.0.1',
    port: '2368'
  }
};


function getEnv(v) {
  if (!process.env.hasOwnProperty(v)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing environment var: ${v}`);
    } else {
      return '';
    }
  }
  return process.env[v];
}


const config = {
  production: Object.assign({}, defaults, {
    url: getEnv('URL'),
    database: {
      client: 'sqlite3',
      connection: {
        filename: '/ghost/blog.db'
      },
      debug: false
    },
    paths: {
      contentPath: '/ghost/content/'
    }
  }),

  development: Object.assign({}, defaults, {
    url: 'http://localhost:2368',
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost-dev.db')
      },
      debug: false
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  })
};


module.exports = config;
