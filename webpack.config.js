const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    index: path.resolve('src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    library: '[name]',
    libraryTarget: 'commonjs2',
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
}
