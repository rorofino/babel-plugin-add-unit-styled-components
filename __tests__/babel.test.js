process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const babelCore = require("babel-core");
const fs = require('fs');
const myPlugin = require('../src');

let babelConfig = {
	presets: ["react"],
	compact: false
}

const runPlugin = (tplName, expectedName) => {
	const templatePath = `${__dirname}/template/${tplName}.tpl.js`;
	const expectedPath = `${__dirname}/template/${expectedName || tplName}.expected.js`;
	const testCode = fs.readFileSync(templatePath, { encoding: 'utf-8' });
	const r = babelCore.transform(testCode, babelConfig);
	const transpiled = fs.readFileSync(expectedPath, { encoding: 'utf-8' });
	return { code: r.code.trim(), expected: transpiled.trim() };
}

describe('testing the plugin with an styled-component component', () => {

	beforeEach(() => {
		babelConfig.plugins = [[myPlugin]]
	});

	test('should add px to props', () => {
		const tplName = "basic";
		const ret = runPlugin(tplName);
		expect(ret.code).toEqual(ret.expected);
	});

	test('should add rem to props', () => {
		babelConfig.plugins = [[myPlugin, { unit: 'rem' }]];
		const tplName = "basic";
		const ret = runPlugin(tplName, 'basic.rem');
		expect(ret.code).toEqual(ret.expected);
	});

	test('should add px to flex shorthand property', () => {
		const tplName = "flexShortHand";
		const ret = runPlugin(tplName);
		expect(ret.code).toEqual(ret.expected);
	});

	test('should update all properties', () => {
		const tplName = "complete";
		const ret = runPlugin(tplName);
		expect(ret.code).toEqual(ret.expected);
	});

	test('it should add px for extend helper', () => {
		const tplName = "extend";
		const ret = runPlugin(tplName);
		expect(ret.code).toEqual(ret.expected);
  });

  test('it should add px for margin-top and keep margin auto', () => {
		const tplName = "margin";
		const ret = runPlugin(tplName);
		expect(ret.code).toEqual(ret.expected);
	});
});