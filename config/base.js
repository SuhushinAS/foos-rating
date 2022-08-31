const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => {
  const isProd = 'production' === options.mode;

  return {
    bail: isProd,
    devServer: {
          historyApiFallback: true,
          host: '0.0.0.0',
          hot: true,
          port: process.env.PORT || 8000,
          proxy: {
            '/api/*': {
              changeOrigin: true,
              secure: false,
              target: 'https://tsk.gear54.me',
            }
          },
          static: options.public,
        },
    devtool: isProd ? false : 'eval-source-map',
    entry: './src/index.js',
    mode: options.mode,
    output: {
      clean: true,
      filename: '[name].min.js',
      library: ['foosRating'],
      path: options.dist,
      publicPath: '/',
    },
    plugins: [new CopyWebpackPlugin({patterns: [{from: options.public, to: options.dist}]})],
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: {
        child_process: 'empty',
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      },
      modules: ['src', 'node_modules'],
    },
    stats: {
      colors: true,
      errorDetails: true,
      reasons: isProd,
    },
    target: isProd ? 'browserslist' : 'web',
    watchOptions: {aggregateTimeout: 300},
  };
};
