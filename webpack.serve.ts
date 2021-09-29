import devServer, {
  Configuration as devServerConfig,
} from "webpack-dev-server";
import webpack from "webpack";
import { devConfig } from "./webpack.dev";
import { merge } from "webpack-merge";
import { resolve } from "path";
import { readFileSync } from "fs";

const resultConfig = merge(devConfig, {
  output: {
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  target: "web",
});

const cmp = webpack(resultConfig);
const serverConfig: devServerConfig = {
  client: {
    overlay: true,
  },
  hot: true,
  static: {
    publicPath: "/",
    directory: resolve(__dirname, "dist"),
  },
  compress: false,
  https: true,
  port: 10000,
};

const watcher = new devServer(serverConfig, cmp);

watcher.start();
