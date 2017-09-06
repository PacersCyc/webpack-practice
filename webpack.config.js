var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bunndle.js',
    path: path.resolve(__dirname, 'dist')
  }
};