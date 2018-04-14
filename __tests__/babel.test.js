process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const babelCore = require("babel-core");
const fs = require('fs');
const myPlugin = require('../src');

let babelConfig = {
	presets: ["react"],
	plugins: [
		[myPlugin],
	],
	compact: false
}

describe('testing the plugin with an styled-component component', () => {
	test('should add px to props', () => {
		const pathToRead = __dirname + '/template/componentToTranspile.js';
		const testCode = fs.readFileSync(pathToRead, { encoding: 'utf-8' });
		const r = babelCore.transform(testCode, babelConfig);
		const transpiled = fs.readFileSync(__dirname + '/template/expectedTranspiledComponentPx.js', { encoding: 'utf-8' });
		expect(transpiled.trim()).toEqual(r.code.trim());
	});
	test('should add rem to props', () => {
		babelConfig.plugins[0][1] = { unit: 'rem' };
		const pathToRead = __dirname + '/template/componentToTranspile.js';
		const testCode = fs.readFileSync(pathToRead, { encoding: 'utf-8' });
		const r = babelCore.transform(testCode, babelConfig);
		const transpiled = fs.readFileSync(__dirname + '/template/expectedTranspiledComponentRem.js', { encoding: 'utf-8' });
		expect(transpiled.trim()).toEqual(r.code.trim());
	});
});