const path = require("path");
const webpack = require("webpack"); // To access built-in plugins
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = (env, argv) => {
  // Production mode automatically uses ModuleConcatenationPlugin
  const production = argv.mode === "production";
  const development = argv.mode === "development";

  console.log("Webpack [" + (production ? "production" : "development") + "]\n");

  return {
    entry: {
      app: path.resolve(__dirname, "src/app"),
    },
    output: {
      // To include a 12 digits hash value to the file or chuck name: [chunkhash:12]
      filename: "[name].js",
      chunkFilename: "[name].js",
      path: path.resolve(__dirname, "static/dist"),
      // Should match Django's STATIC_URL value
      publicPath: "/static/",
      // Include comments in bundles with information about the contained modules
      pathinfo: false,
      // Non-specific assets destination
      assetModuleFilename: "assets/[name][ext]",
    },
    devtool: false,
    plugins: [
      new MiniCssExtractPlugin({
        // To include a 12 digits hash value to the file or chuck name: [chunkhash:12]
        filename: "styles/[name].css",
        chunkFilename: "styles/[name].css",
      }),
      new ESLintWebpackPlugin({ emitWarning: development, failOnWarning: development }),
      // Run TypeScript type checker on a separate process.
      new ForkTsCheckerWebpackPlugin(),
      // The ts-loader generates ".d.ts" files, these should be ignored
      new webpack.WatchIgnorePlugin({ paths: [/\.d\.ts$/] }),
      // Inject jQuery implicit globals
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery",
      }),
    ].concat(
      development
        ? [
            // Use custom source map generation (only in development)
            // A full SourceMap is emitted as a separate file.
            new webpack.SourceMapDevToolPlugin({
              filename: "[file].map",
              // Don't exclude vendors.js unless you want to see a warning in the browser debug console
              // exclude: ["vendors.js"],
            }),

            // Yields the best quality SourceMaps for development (included in generated bundle)
            // This is equivalent to => devtool: "eval-source-map".
            //new webpack.EvalSourceMapDevToolPlugin({
            //  exclude: /node_modules/, // Do not generate inlined source map for vendors modules
            //}),
          ]
        : [
            // Remove all files inside webpack's "output.path" directory,
            // as well as all unused webpack assets on production build.
            new CleanWebpackPlugin({ root: __dirname, verbose: true }),
            new BundleAnalyzerPlugin({
              openAnalyzer: false, // Do not automatically open report in default browser
              analyzerMode: "static",
              reportFilename: "../../bundle-analyzer-report.html",
            }),
          ],
    ),
    optimization: {
      removeAvailableModules: production,
      removeEmptyChunks: production,
      splitChunks: {
        cacheGroups: {
          // Create a "vendors" chunk, which includes all code from node_modules in the whole application.
          // This might result in a large chunk containing all external packages. It is recommended to
          // only include your core frameworks and utilities and dynamically load the rest of the dependencies.
          // vendors: {
          //   test: /[\\/]node_modules[\\/]/,
          //   chunks: "all",
          //   name: "vendors",
          //
          //   // To generate a bundle per package (in the "vendors" subfolder).
          //   // This requires to update the base template to include each bundles.
          //   // Note: "cacheGroupKey" == "vendors" (key of the cacheGroup)
          //   //name(module, chunks, cacheGroupKey) {
          //   // Get the package name. For example "node_modules/packageName/not/this/part.js" or "node_modules/packageName"
          //   //  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          //   // NPM package names are URL-safe, but some servers don't like @ symbols
          //   //  return `${cacheGroupKey}/${packageName.replace("@", "")}`;
          //   //},
          // },
        },
      },
      // In production, minimize the bundle using the plugin(s) specified in "optimization.minimizer".
      minimize: production,
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: { output: { comments: false } },
        }),
        new CssMinimizerWebpackPlugin({
          parallel: true,
          minimizerOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
        }),
      ],

      // Enable/Disable ModuleConcatenationPlugin: concatenate the scope of all
      // modules into one closure to allow faster execution time in the browser.
      // Remark: this is enabled by default in production.
      concatenateModules: production,
    },
    performance: {
      // Production build total size warning when over 400 KB
      maxAssetSize: 1024 * 400,
      maxEntrypointSize: 1024 * 400,
      hints: development ? false : "warning",
    },
    module: {
      // IMPORTANT: when multiple loaders are chained, they are executed in reverse order.
      rules: [
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                onlyCompileBundledFiles: true,
                transpileOnly: true,
                happyPackMode: true,
                experimentalWatchApi: development,
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            // MiniCssExtractPlugin should be used only on production builds without style-loader
            // in the loaders chain, especially if you want to have HMR in development.
            // Remark: HMR is automatically supported in Webpack 5. No need to configure it.
            { loader: MiniCssExtractPlugin.loader, options: {} },
            // The importLoaders option configure how many loaders before css-loader should be applied to imported resources.
            { loader: "css-loader", options: { importLoaders: 2 } },
            { loader: "postcss-loader", options: {} },
            { loader: "sass-loader", options: {} },
          ],
        },
        {
          test: /\.svg$/i,
          // The "asset" type combines "asset/resource" and "asset/inline":
          // by defautlt, if a module size is greater than 8Kb, then it uses
          // "asset/resource", otherwise it uses "asset/inline"
          type: "asset",
          generator: {
            filename: "icons/[name][ext]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // Modify "asset/inline" limit to 10Kb
            },
          },
          use: "svgo-loader",
        },
        {
          test: /\.(jpe?g|png|gif|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/i,
          type: "asset/resource",
          generator: {
            // To include a 12 digits hash value to the file name: [md5:hash:hex:12]
            filename: "fonts/[name][ext]",
          },
        },
      ],
    },
    resolve: {
      modules: ["node_modules"],
      alias: {
        ScrollToPlugin: "gsap/src/uncompressed/plugins/ScrollToPlugin",
        // The ScrollMagic alias to prevent warning: "There are multiple modules with names that only differ in casing."
        ScrollMagic: "scrollmagic/scrollmagic/uncompressed/ScrollMagic",
        "ScrollMagic.animation.gsap": "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap",
        "ScrollMagic.debug.addIndicators": "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators",
      },
      // Attempt to resolve listed extensions in order.
      // This also enables to leave off the extension with "import".
      extensions: [".ts", ".tsx", ".js", ".sass", ".scss"],
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: ["node_modules"],
    },
  };
};
