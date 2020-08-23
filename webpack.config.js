const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WorkboxPlugin = require('workbox-webpack-plugin')

// @ts-ignore
module.exports = {
	entry: './src/index.tsx',

	devServer: {
		contentBase: '/',
		hot: true,
		historyApiFallback: true
	},

	devtool: 'source-map',

	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: { outputPath: 'images' }
			}
		]
	},

	node: {
		fs: 'empty',
		tls: 'empty',
		net: 'empty',
		child_process: 'empty'
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},

	plugins: [
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'idena-pocket',
			template: 'public/index.html',
			hash: true,
			minify: true
		}),
		new CopyPlugin([
			{ from: 'public', to: '', ignore: ['index.html'] },
			{ from: 'public/manifest', to: 'manifest' }
		]),
		new EnvironmentPlugin(['NODE_ENV']),
		...(process.env.NODE_ENV === 'stats'
			? [new BundleAnalyzerPlugin()]
			: [])
	],

	stats: {
		children: false
	},

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
		chunkFilename: 'libraries.js'
	},

	mode: process.env.NODE_ENV || 'development'
}
