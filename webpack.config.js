const path = require('path');

const ANALYZE_BUNDLE = ['1', 'true'].indexOf((process.env || {}).ANALYZE_BUNDLE) !== -1;

module.exports = {
    entry: "./src/index.tsx",
    output: {
        library: 'walletConnectWizard',
        libraryTarget: 'umd',
        //globalObject: 'this',
        filename: "index.js",
        path: __dirname + "/lib",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".svg"],
        alias: {
          'styled-components': path.resolve('./node_modules/styled-components')
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // Inline svgs are awesome
            { test: /\.svg$/, loader: 'svg-inline-loader' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // NOTE: do NOT do this! it causes webpack errors and we don't like it!
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    //externals: {
    //    "react": "React",
    //    "react-dom": "ReactDOM"
    //},
};

if(ANALYZE_BUNDLE) {
    console.log("Analyzing bundle");
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    if(!module.exports.plugins) {
        module.exports.plugins = [];
    }
    module.exports.plugins.push(new BundleAnalyzerPlugin);
}
