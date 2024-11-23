const path = require("path");

module.exports = {
  entry: {
    main: "./src/js/clientSeance.js", // Точка входа нашего приложения
    clientHall: "./src/js/client_hall.js",
    clientPayment: "./src/js/clientPayment.js",
    clientTicket: "./src/js/clientTicket.js",
  },
  output: {
    filename: "[name].bundle.js",

    path: path.resolve(__dirname, "dist"),
  },
  mode: "development", 
  module: {
    rules: [
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
