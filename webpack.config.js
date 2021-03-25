const path = require('path');

module.exports = [{
  mode: 'production',
  entry: {
    bundle: path.join(__dirname, 'source', 'index.js'),
  },
  output: {
    path: path.join(__dirname),
    filename: 'background.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
}];
