/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const BUILD_FOLDER_PATH = process.env.BUILD_FOLDER_PATH || 'build';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), BUILD_FOLDER_PATH),
    publicPath: PUBLIC_PATH,

    // Merge with env dependent settings
    ...options.output,
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // force to transform some 3rd party libraries to es5
        include: [
          path.resolve(process.cwd(), './node_modules/dom7'),
          path.resolve(process.cwd(), './node_modules/swiper'),
          path.resolve(process.cwd(), './node_modules/query-string'),
          path.resolve(process.cwd(), './node_modules/split-on-first'),
          // N.B please sync this listing with babel.config.js
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /global/, // foo.css?inline
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        exclude: /fonts/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/,
        include: /fonts/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PUBLIC_PATH: '/',
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  resolveLoader: {
    modules: ['node_modules', 'internals/webpack/loaders'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
