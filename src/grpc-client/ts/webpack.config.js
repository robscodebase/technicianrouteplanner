const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/map-tools.js",
  output: {
    path: "/go/src/agency_app/src/file-server/app/templates/src/local/js/campaign/",
    filename: 'grpc-map-tools.js'
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
