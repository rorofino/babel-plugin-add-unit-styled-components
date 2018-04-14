const AddUnit = require('./visitors/AddUnit');
const  { isStyled, isCSSHelper, isKeyframesHelper, isInjectGlobalHelper } = require('./utils/detectors');

module.exports = function (babel) {
	const t = babel.types;
	return {
		visitor: {
			TaggedTemplateExpression(path, state) {
				const _isStyled = isStyled(t, path.node.tag, state)
				const _isCSSHelper = isCSSHelper(t, path.node.tag, state)
				const _isKeyframesHelper = isKeyframesHelper(t, path.node.tag, state)
				const _isInjectGlobalHelper = isInjectGlobalHelper(t, path.node.tag, state)
				if (_isStyled || _isCSSHelper || _isKeyframesHelper || _isInjectGlobalHelper) {
					AddUnit(t, path, state);
				}
			},
		},
	}
}