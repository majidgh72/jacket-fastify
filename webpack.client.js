const path = require("path");

module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    filename: "js/client.js",
    path: path.resolve(__dirname, 'dist/client'),
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    },
    alias: {
      client: path.resolve(__dirname, 'src/client/'),
      server: path.resolve(__dirname, 'src/server/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader"
      }
    ]
  }
}
