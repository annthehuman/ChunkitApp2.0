const path = require('path')

module.exports = {
    entry: {
      app: '../frontend/src/index.js'
    },
    watch: true,
    devtool: 'source-map',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'static/frontend')
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"]
        }, {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.tsx?$/,
          use: [                        {
            loader: 'ts-loader',
            options: {
                configFile: path.resolve('./tsconfig.json'),
            },
        },],
          exclude: /node_modules/,
        },
      ]
    },
    resolve: {
      extensions: [
        '', '.js', '.jsx', '.css','.tsx', '.ts'
      ]
    }
  };