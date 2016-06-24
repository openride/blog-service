// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).
// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

const path = require('path');


function getEnv(v, def) {
  if (!process.env.hasOwnProperty(v)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing environment var: ${v}`);
    } else {
      return def || '';
    }
  }
  return process.env[v];
}


const defaults = {
  compress: false,  // let nginx handle this
  mail: {},
  server: {
    host: '0.0.0.0',
    port: getEnv('PORT', '2368')
  }
};


const config = {
  production: Object.assign({}, defaults, {
    url: getEnv('URL'),
    database: {
      client: 'sqlite3',
      connection: {
        filename: '/persist/blog.db'
      },
      debug: false
    },
    paths: {
      contentPath: '/persist/content/'
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
