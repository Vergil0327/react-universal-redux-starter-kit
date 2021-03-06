var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
var dotenv = require('dotenv');

dotenv.config();

var config = {
	devtool: 'cheap-module-source-map',
	context: path.join(__dirname, '..'),
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		'./src/client.js',
	],
	output: {
		path: path.join(__dirname, '..', 'public', 'dist'),
		publicPath: 'http://localhost:3000/dist/',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test:/\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				},
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap',
			},
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
			},
			{
				test: webpackIsomorphicToolsPlugin.regular_expression('images'),
				loader: 'url-loader?limit=10240'
			},
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// process.env.API comes from the file '.env', want to learn more, google dotenv
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'process.env.API': JSON.stringify(process.env.API)
		}),
		webpackIsomorphicToolsPlugin.development(),
	]
};

module.exports = config;
