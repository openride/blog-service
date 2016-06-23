const path = require('path');
const ghost = require('ghost');

const options = {
  config: path.join(__dirname, 'config.js')
};

ghost(options)
  .then(blogServer => {
    blogServer.start();
  });
