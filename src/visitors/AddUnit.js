const postcss = require('postcss');
const addUnitToNumber = require('../utils/addUnitToNumber');
const simpleNumberReplacementProps = require('../utils/propsToAdd');
const isIgnoreValue = require('../utils/isIgnoreValue');

const customFixers = {
	// Add unit to flex basis in flex shorthand
	flex: function (value, unit) {
		const regex = /((?:[\d.]+\s+){2}\d*)(?!\d|\.|[Ee]|px|substitution|r?em|%)/;
		return value.replace(regex, `$1${unit}`);
	},
};

function addUnit(t, path, state) {
	const replaceUnit = ['px', '%', 'em', 'rem'];
	const unitToinsert = state.opts.unit || 'px';
	const { quasi, tag } = path.node;
	const { quasis, expressions } = quasi;
	// Substitute all ${interpolations} with arbitrary test that we can find later
	// This is so we can shove it in postCSS
	const substitutionNames = expressions.map((value, index) => `/*__${index}substitution__*/`);
	let cssText = quasis[0].value.cooked + substitutionNames.map((name, index) => name + quasis[index + 1].value.cooked).join('');
	let substitutionMap = substitutionNames.reduce((acc, item, index) => {
		acc[item] = expressions[index];
		return acc;
	}, {});

	let root = postcss.parse(cssText);
	const notInPropertiesIndexes = {};
	root.walkComments((comment) => {
		const index = substitutionNames.indexOf(`/*${comment.text}*/`);
		if (index >= 0) notInPropertiesIndexes[index] = true;
	});

	substitutionNames.forEach((name, index) => {
		if (!notInPropertiesIndexes[index]) substitutionNames[index] = name.replace(/^\/\*(.+)\*\/$/, '$1');
	});
	cssText = quasis[0].value.cooked + substitutionNames.map((name, index) => name + quasis[index + 1].value.cooked).join('');
	substitutionMap = substitutionMap = substitutionNames.reduce((acc, item, index) => {
		acc[item] = expressions[index];
		return acc;
	}, {});

	// Transform all simple values
	root = postcss.parse(cssText);
	const propsChanged = [];
	root.walkDecls((decl) => {
		const testProp = decl.prop.replace(/-/g, '').toLowerCase();
		if (simpleNumberReplacementProps.find(x => testProp.match(x))) {
			if (!replaceUnit.find(x => decl.value.indexOf(x) > -1) && !decl.value.match(/__\d+substitution__/g)) {
				if (!isIgnoreValue(decl.value)) {
					propsChanged.push(testProp);
				}
				decl.value = addUnitToNumber(decl.value, unitToinsert);
			}
		}
		if (testProp in customFixers) {
			const valueBefore = decl.value;
			decl.value = customFixers[testProp](decl.value, unitToinsert);
			if (decl.value !== valueBefore) {
				propsChanged.push(testProp);
			}
		}
	});

	if (propsChanged.length === 0) {
		return;
	}

	const nextCssText = String(root);
	const substititionNames = Object.keys(substitutionMap);
	const substitionNamesRegExp = new RegExp(`(${substititionNames.map(n => n.replace(/\*/g, '\\*')).join('|')})`, 'g');

	const newCssArray = substititionNames.length > 0 ? nextCssText.split(substitionNamesRegExp) : [nextCssText];

	const quasiArray = [];
	for (let i = 0; i < newCssArray.length; i = i + 2) {
		if (newCssArray.length > i) {
			const raw = newCssArray[i];
			const value = { cooked: raw, raw };
			quasiArray.push(t.templateElement(value, i === newCssArray.length - 1));
		}
	}
	const newQuasi = t.templateLiteral(quasiArray, Object.values(substitutionMap));
	return path.replaceWith(t.taggedTemplateExpression(tag, newQuasi));

}

module.exports = addUnit;