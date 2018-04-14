const simpleNumberReplacementProps = [
	// All tests have hyhens removed and are lower case
	/^border(top|bottom)(right|left)radius$/,
	/^borderradius$/,
	/^border(top|right|bottom|left|horizontal|vertical)?width$/,
	/^border$/,
	/^(margin|padding)(top|right|bottom|left|horizontal|vertical)?$/,
	/^(top|right|left|bottom)$/,
	/^(min|max)?(width|height)$/,
	/^flexbasis$/,
	/^font(size)?$/,
	/^lineheight$/,
];

module.exports = simpleNumberReplacementProps;