const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '../', dir);
}

const htmlMinify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true
}

module.exports = {
  entry: {
    index: resolve('src/index/index'),
    about: resolve('src/about/about')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  resolve: {
    alias: {
      "@": resolve('src'),
      "static": resolve('static')
    },
    extensions: ['.js', '.less', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: resolve('src/index/index.html'),
      filename: 'index.html',
      inlineSource: '.(js|css)$',
      minify: htmlMinify
    }),
    new HtmlWebpackPlugin({
      chunks: [],
      template: resolve('src/list/list.html'),
      filename: 'list.html',
      minify: htmlMinify
    }),
    new HtmlWebpackPlugin({
      chunks: ['about'],
      template: resolve('src/about/about.html'),
      filename: 'about.html',
      inlineSource: '.(js|css)$',
      minify: htmlMinify
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.(jpg|jpeg|png|gif|svg)$/,
        use: ['url-loader']
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:[{
          loader:'file-loader',
          options:{
            name:'img/[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime',
              ]
            }
          }
        ]
      }
    ]
  }
}