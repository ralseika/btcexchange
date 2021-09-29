import webpack from "webpack";
import { config } from "./webpack.common";
import { merge } from "webpack-merge";

const thisConfig: webpack.Configuration = {
  mode: "development",
  devtool: "source-map",
  cache: {
    type: "filesystem",
    name: "danskeauctiondev",
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true,
    }),
  ],
};

export const devConfig = merge(config, thisConfig);
