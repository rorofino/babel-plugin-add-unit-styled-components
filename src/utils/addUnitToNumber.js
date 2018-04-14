const replace = function(value, unit) {
	return value.replace(/([+-]?(?:\d*\.)?\d+(?:[Ee][+-]?\d+)?)(?!\d|\.|[Ee]|px|substitution|r?em|%)/g, `$1${unit}`);
}

module.exports = replace;