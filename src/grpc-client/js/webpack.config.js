const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/grpc-client.js",
  output: {
    path: "/go/src/grpc-client/js/static/",
    filename: 'grpc-client.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src|_proto/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'USE_TLS': process.env.USE_TLS !== undefined
    })
  ]
};
