/** Installs underscore methods to the prototype for more elegant syntax using nativity. 
	@see		http://documentcloud.github.com/underscore
	@see		https://github.com/metaraine/nativity
*/

(function() {
	// Establish the root object, `window` in the browser, or `global` on the server.
	var root = this;
	var isNode = (typeof module !== 'undefined' && module.exports);

	// Require in libs if node
	var nativity	= isNode ? require('nativity')		: Nativity;
	var	_			= isNode ? require('underscore')	: root._;

	/////
	// Underscore Methods
	////

	var collectionMethods = [
		"each",
		"map",
		"reduce",
		"reduceRight",
		"find",
		"filter",
		"where",
		"findWhere",
		"reject",
		"every",
		"some",
		"contains",
		"invoke",
		"pluck",
		"max",
		"min",
		"sortBy",
		"groupBy",
		"indexBy",
		"countBy",
		"shuffle",
		"sample",
		"toArray",
		"size"
	];

	var arrayMethods = [
		"first",
		"initial",
		"last",
		"rest",
		"compact",
		"flatten",
		"without",
		"partition",
		"union",
		"intersection",
		"difference",
		"uniq",
		"zip",
		"object",
		"indexOf",
		"lastIndexOf",
		"sortedIndex",
		"range"
	];

	var functionMethods = [
		"bind",
		"bindAll",
		"partial",
		"memoize",
		"delay",
		"defer",
		"throttle",
		"debounce",
		"once",
		"after",
		"now",
		"wrap",
		"compose"
	];

	var objectMethods = [
		"keys",
		"values",
		"pairs",
		"invert",
		"functions",
		"extend",
		"pick",
		"omit",
		"defaults",
		"clone",
		"tap",
		"has",
		"matches",
		"property",
		"isEqual",
		"isEmpty",
		"isElement",
		"isArray",
		"isObject",
		"isArguments",
		"isFunction",
		"isString",
		"isNumber",
		"isFinite",
		"isBoolean",
		"isDate",
		"isRegExp",
		"isNaN",
		"isNull",
		"isUndefined"
	];

	var utilityMethods = {
		allTypes: [
			"identity",
			"constant"
		],
		string: [
			"escape",
			"unescape",
			"template"
		],
		number: [
			"times"
		],
		object: [
			"mixin",
			"result"
		]
	};


	// Register everything Via Nativity
	var installNativityUnderscore = {
		install: function() {
			nativity.install(Array.prototype, _, [].concat(arrayMethods, collectionMethods, utilityMethods.allTypes));
			nativity.install(Function.prototype, _, [].concat(functionMethods, "identity"));
			nativity.install(Object.prototype, _, [].concat(objectMethods, utilityMethods.allTypes, utilityMethods.object));
			nativity.install(String.prototype, _, [].concat(utilityMethods.string, utilityMethods.allTypes));
			nativity.install(Number.prototype, _, [].concat(utilityMethods.number, utilityMethods.allTypes));
		},
	};

	// Make active via underscore 
	if(isNode){
		module.exports = installNativityUnderscore;
	} else{
		installNativityUnderscore.install();
	}

}).call(this);

