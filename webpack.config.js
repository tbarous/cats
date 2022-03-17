const path = require("path");

const config = {
    entry: {
        'index': './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-transform-runtime", {"regenerator": true}
                            ]
                        ]
                    },
                },
            }
        ],
    },
    mode: "production",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        allowedHosts: "all"
    },
};

module.exports = config;