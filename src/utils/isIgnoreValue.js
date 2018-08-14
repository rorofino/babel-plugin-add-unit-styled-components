const ignoreList = [
	/^auto$/,
];

const isIgnoreValue = value => ignoreList.find(regex => regex.test(value)) !== undefined

module.exports = isIgnoreValue;
