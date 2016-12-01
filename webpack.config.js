const webpackValidator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  const config = {
    entry: resolve(__dirname, 'src/react-sandbox.js'),
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bundle.js',
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      historyApiFallback: true,
      port: 7777
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'es2016', 'stage-2', 'react']
          }
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader'
          })
        }
      ]
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        hash: true,
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new ExtractTextPlugin('[name].css'),
    ])
  };

  if (env.debug) {
    console.log(config);
    debugger;
  }

  return webpackValidator(config);
};
