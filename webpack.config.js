const path = require('path');

module.exports = {
  entry: './src/client/main.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'out.js',
  },
  module: {
    loaders: [{loader: 'babel-loader'}],
  },
};
