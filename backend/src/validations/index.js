const { readdirSync } = require("fs"),
	path = require("path");

module.exports = () =>
	readdirSync(__dirname, { withFileTypes: true })
		.filter(ele => ele.isFile() && ele.name !== 'index.js')
		.map(ele => require(path.join(__dirname, ele)));
