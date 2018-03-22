const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEBUG = process.env.NODE_ENV === 'development';

const SRC_PATH = path.resolve('src');
const HTML_OUTPUT_PATH = path.resolve('./');
const SCRIPT_OUTPUT_PATH = path.resolve('build');

const DEBUG_CSS_RULE = {
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        importLoaders: 1,
        camelCase: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
};

const PUBLISH_CSS_RULE = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 1,
          minimize: true,
          camelCase: true
        }
      },
      'postcss-loader'
    ]
  })
};

const DEBUG_PLUGINS = [
  new HtmlWebpackPlugin({
    title: '[debug] Leonardo-mbc',
    filename: path.join(HTML_OUTPUT_PATH, 'index.html'),
    template: path.join(SRC_PATH, 'assets/index.template.html')
  })
];

const PUBLISH_PLUGINS = [
  new ExtractTextPlugin('styles.min.css'),
  new UglifyJSPlugin(),
  new HtmlWebpackPlugin({
    title: 'Leonardo-mbc',
    filename: path.join(HTML_OUTPUT_PATH, 'index.html'),
    template: path.join(SRC_PATH, 'assets/index.template.html'),
    minify: {
      collapseWhitespace: true
    }
  })
];

module.exports = {
  mode: IS_DEBUG ? 'development' : 'production',
  devtool: IS_DEBUG ? 'source-map' : '',
  devServer: {
    contentBase: HTML_OUTPUT_PATH,
    compress: true,
    host: '0.0.0.0',
    port: 3331,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    alias: {
      "asset:": path.join(SRC_PATH, 'asset'),
      "view:": path.join(SRC_PATH, 'view')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: [/node_modules/, /__tests__/]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(png|jpg|gif|otf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {}
        }]
      },
      IS_DEBUG ? DEBUG_CSS_RULE : PUBLISH_CSS_RULE
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/,
    ]),
    ...(IS_DEBUG ? DEBUG_PLUGINS : PUBLISH_PLUGINS),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  entry: [
    path.join(SRC_PATH, 'index.tsx'),
    path.join(SRC_PATH, 'assets/styles/global.css')
  ],
  output: {
    filename: 'scripts.min.js',
    path: IS_DEBUG ? HTML_OUTPUT_PATH : SCRIPT_OUTPUT_PATH
  },
  cache: true
};
