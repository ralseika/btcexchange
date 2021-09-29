import webpack from "webpack";
import { resolve } from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import AssetsPlugin from "assets-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const config: webpack.Configuration = {
  entry: {
    app: resolve(__dirname, "./src/index.tsx"),
  },
  cache: {
    type: "filesystem",
    cacheDirectory: resolve(__dirname, ".webpackcache"),
    buildDependencies: {
      default: [__filename],
    },
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    runtimeChunk: "single",
    removeEmptyChunks: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        defaultVendors: false,
        vendors: {
          name: "vendors",
          idHint: "vendors",
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    path: resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].js?[contenthash]",
    chunkFilename: "js/[name].js?[contenthash]",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new AssetsPlugin({
      path: resolve(__dirname, "./dist"),
      removeFullPathAutoPrefix: true,
      fullPath: true,
      entrypoints: true,
      filename: "webpack.assets",
      keepInMemory: false,
      prettyPrint: true,
    }),
    new HtmlWebpackPlugin({
      title: "BTC Exchange",
      template: resolve(__dirname, "src", "index.html"),
      favicon: "./src/assets/favicon.ico",
    }),
  ],
};
