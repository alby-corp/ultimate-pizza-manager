const path = require('path');

module.exports = {
    mode: "development", // "production" | "development" | "none"

    entry: "./app/index", // string | object | array

    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: "bundle.js", // string

        publicPath: "/assets/",

        library: "UltimatePizzaManger", // string, // the name of the exported library

        libraryTarget: "umd", // universal module definition
    }
};