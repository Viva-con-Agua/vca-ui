module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
        loaderOptions: {
          sass: {
            additionalData: '@import "@assets/styles/main.scss";',
          }
        }
      }
    ],
  },
};
