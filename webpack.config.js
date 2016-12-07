const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  const config = {
    entry: resolve(__dirname, 'src/index.js'),
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bundle.js',
      pathinfo: ifNotProd()
    },
    resolve: {
      extensions: ['.js', '.json']
    },
    stats: {
      color: true,
      reasons: true,
      chunks: true
    },
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      contentBase: '/',
      historyApiFallback: true,
      port: 7777
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'es2016', 'stage-2', 'react']
          }
        },
        {
          test: /\.json$/,
          loader: 'jason-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader'
          })
        }
      ]
    },
    plugins: removeEmpty([
      new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
        hash: true,
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
      ])
    ])
  };

  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }

  return config;
};
