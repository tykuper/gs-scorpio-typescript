module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      // {
      //   test: /\.(scss)$/,
      //   use: [
      //     {
      //       loader: "style-loader", // inject CSS to page
      //     },
      //     {
      //       loader: "css-loader", // translates CSS into CommonJS modules
      //     },
      //     {
      //       loader: "postcss-loader", // Run post css actions
      //       options: {
      //         plugins: function () {
      //           // post css plugins, can be exported to postcss.config.js
      //           return [require("precss"), require("autoprefixer")];
      //         },
      //       },
      //     },
      //     {
      //       loader: "sass-loader", // compiles Sass to CSS
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
