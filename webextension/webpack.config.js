const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  
  // mode: 'production',
  // entry: path.resolve(__dirname, 'wp-dev/main.js'),
  entry: path.resolve(__dirname, 'wp-dev/index.ts'),
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, "tsconfig.webpack.json"),
          }
        }],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'wp-build.js',
    // path: path.resolve(__dirname, 'wp-build/'),
    path: path.resolve(__dirname, 'src/overlay-dist'),
  },

};