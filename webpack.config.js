const nodeExternals = require("webpack-node-externals");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/transform-runtime"],
    },
  },
};

const serverConfig = {
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "index.js": path.resolve(__dirname, "src/server.js"),
  },
  module: {
    rules: [
      js,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
};

const clientConfig = {
  target: "web",
  entry: {
    "app.js": path.resolve(__dirname, "src/client/App.js"),
  },
  module: {
    rules: [
      js,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/[name]",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/styles.css",
    }),
  ],
};

module.exports = [serverConfig, clientConfig];
