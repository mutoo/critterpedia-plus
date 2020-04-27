module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    'emotion',
  ],
  env: {
    production: {
      only: [
        'app',
        'node_modules/dom7',
        'node_modules/swiper',
        'node_modules/query-string',
        'node_modules/split-on-first',
        // N.B please sync this listing with babel.config.js
      ],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
