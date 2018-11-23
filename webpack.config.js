const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const terserJsPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    entry: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`
  },
  optimization: {
    minimizer: [
      new terserJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
  },
  module: {
    rules: [{
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.bpmnlintrc$/,
        use: {
          loader: 'bpmnlint-loader'
        }
      }, {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }, ],
      }, {
        // Loads images into CSS and Javascript files
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }],
      }, {
        test: /\.(eot|ttf|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }],
      }, {
        test: /\.(bpmn)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'diagrams/'
          }
        }],
      }, {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};