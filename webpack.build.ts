import { config } from "./webpack.common";
import { merge } from "webpack-merge";
import webpack from "webpack";

const thisConfig: webpack.Configuration = {
  mode: "production",
  devtool: false,
  cache: {
    type: "filesystem",
    name: "btcformprod",
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "production", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
  ],
};

const cmp = webpack(config);

cmp.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(
    stats?.toString({
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console
    })
  );
});

export const prodConfig = merge(config, thisConfig);
