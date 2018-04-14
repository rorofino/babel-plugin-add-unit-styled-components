const AddUnit = require('./visitors/AddUnit');

module.exports = function (babel) {
	const t = babel.types;
	return {
		visitor: {
			TaggedTemplateExpression(path, state) {
				AddUnit(t, path, state);
			},
		},
	}
}