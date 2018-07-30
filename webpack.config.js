const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: {
		'./assets/js/index.js': [
			'./src/main.js'
		],
		'./assets/css/style.css': [
			'./src/index.less'		
		]
	},
	output: {
		filename: '[name]',
		path: path.resolve(__dirname, 'docs')
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Da Terra na Nuvem',
			template: './src/index.html'
		}),
		new ExtractTextPlugin('[name]'),
		new Dotenv(),
	],
	devServer: {
		contentBase: "./docs"
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: "css-loader", 
							options: { minimize: true }
						},
						{
							loader: "less-loader"
						}
					]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: { minimize: true, url: false },
						}
					]
				})
			},
		]
	},
};