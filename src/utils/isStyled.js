const importLocalName = function(name, state) {
	let localName = name === 'default' ? 'styled' : name

	state.file.path.traverse({
		ImportDeclaration: {
			exit(path) {
				const { node } = path

				if (node.source.value === 'styled-components') {
					for (const specifier of path.get('specifiers')) {
						if (specifier.isImportDefaultSpecifier()) {
							localName = specifier.node.local.name
						}

						if (specifier.isImportSpecifier() && specifier.node.imported.name === name) {
							localName = specifier.node.local.name
						}

						if (specifier.isImportNamespaceSpecifier()) {
							localName = specifier.node.local.name
						}
					}
				}
			}
		}
	})

	return localName
}

const isStyled = function(t, tag, state) {
	if (t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name !== 'default' /** ignore default for #93 below */) {

		return isStyled(t, tag.callee.object, state)
	} else {
		return (
			(t.isMemberExpression(tag) && tag.object.name === importLocalName('default', state)) ||
			(t.isCallExpression(tag) && tag.callee.name === importLocalName('default', state)) ||

			(state.styledRequired && t.isMemberExpression(tag) && t.isMemberExpression(tag.object) && tag.object.property.name === 'default' && tag.object.object.name === state.styledRequired) ||
			(state.styledRequired && t.isCallExpression(tag) && t.isMemberExpression(tag.callee) && tag.callee.property.name === 'default' && tag.callee.object.name === state.styledRequired)
		)
	}
}

module.exports = isStyled;