module.exports = {
	entry: './src/main.jsx',
	output: {
		path: __dirname + '/dist',
		filename: 'main.js'
	},
	module: {
		loaders: [
			{ test: /\.css/, loader: "style-loader!css-loader" },
			{ test: /\.(js|jsx)$/, loader: "jsx-loader?harmony" }
		]
	},
};
