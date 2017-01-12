const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const SRC = resolve(__dirname, 'src');
const BUILD = resolve(__dirname, 'build');

module.exports = env => {
  const { ifNotProd } = getIfUtils(env);

  const config = {
    entry: './src/index.js',
    output: {
      path: BUILD,
      publicPath: '/',
      filename: 'bundle.js',
      pathinfo: ifNotProd()
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.json', '.scss']
    },
    performance: {
      hints: false
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: '/build/',
      historyApiFallback: true,
      port: 7777,
      stats: {
        colors: true,
        reasons: true,
        assets: false,
        chunks: false
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          include: SRC,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          include: SRC,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'es2016', 'stage-2', 'react']
          }
        },
        {
          test: /\.json$/,
          include: SRC,
          loader: 'jason-loader'
        },
        {
          test: /\.scss$/,
          include: SRC,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ifNotProd(
              'css-loader?sourceMap!sass-loader?sourceMap',
              'css-loader!sass-loader'
            )
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot)$/,
          loader: 'url-loader?limit=10000&name=assets/[hash].[ext]'
        }
      ]
    },
    plugins: removeEmpty([
      new ExtractTextPlugin({filename: '[name].css'}),
      new HtmlWebpackPlugin({
        hash: true,
        filename: 'index.html',
        template: 'src/index.html',
        inject: 'body',
        alwaysWriteToDisk: true
      }),
      new CopyWebpackPlugin([
        { from: './src/assets', to: 'assets' }
      ],
        { ignore: ['.DS_Store'] }
      ),
      new BrowserSyncPlugin(
        {
          proxy: 'http://localhost:7777',
          host: 'localhost',
          port: 7778,
          open: false,
          notify: false
        },
        {
          reload: false
        }
      ),
      new webpack.LoaderOptionsPlugin({
        options: {
          sassLoader: {
            data: '@import "src/css/_variables.scss"; @import "src/css/_mixins.scss";',
            includePaths: 'src/css'
          },
          context: resolve(__dirname, './')
        }
      })
    ])
  };

  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }

  return config;
};
