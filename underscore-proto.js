/** Installs array, collection, and function methods from UndescoreJS to the Array prototype for more elegant syntax. 
	@see		http://documentcloud.github.com/underscore
	@remarks	Includes all array and collection functions except: intersection, union, zip, range, toArray
*/

/** Returns the in-bounds index of the given index for the array, supports negative and out-of-bounds indices. 
		@private
*/
var circ = function(arr, i) {

	// return first index if i is null or undefined
	if(i === undefined || i === null) {
		return arr[0];
	}

	// one modulus to get in range, another to eliminate negative
	return (i % arr.length + arr.length) % arr.length;
};

/** Indexes into an array, supports negative indices. */
var index = function(arr, i) {
	return arr[circ(arr, i)];
};

/** Returns a new array containing the elements of the given array shifted n spaces to the left, wrapping around the end. */
var rotate = function(arr, n) {
	var output = [];
	var len = arr.length;
	for(var i=0; i<len; i++) {
		output.push(index(arr, i+n));
	}
	return output;
};

/** Returns a new function that forwards 'this' as the first parameter to the given function, and thus can be called as instance method (or prototype method ) of the object itself. 
	@param thisIndex	Forwards 'this' at the given parameter index. Default: 0.
*/
var toInstance = function(f, thisIndex) {
	thisIndex = thisIndex || 0;
	return function() {
		var args = Array.prototype.slice.apply(arguments);
		return f.apply(this, rotate([].concat([this], args), -thisIndex));
	};
};

/** Assigns the given list of methods from the host object to the protoObj's prototype after converting them with toInstance. */
var install = function(protoObj, host, methods, thisIndex) {
	var len = methods.length;
	for(var i=0; i<len; i++) {

		// the method can be a string if the hostKey and protoKey are the same ('contains') or an object that maps the host key to the proto key ({repeatString: 'repeat'})
		var hostKey, protoKey;
		if(typeof(methods[i]) === 'string') {
			hostKey = methods[i];
			protoKey = methods[i];
		}
		else {
			for(var name in methods[i]) {
				hostKey = name;
				protoKey = methods[i][name];
				break;
			}
		}

		protoObj.prototype[protoKey] = toInstance(host[hostKey], thisIndex);
	}
};

var lambdinate = function(oldMappingFunction) {
	return function(list, iterator, context) {
		return oldMappingFunction(list, typeof iterator == "string" ? iterator.lambda() : iterator, context);
	};
};

install(Array, _, ["first", "rest", "last", "compact", "flatten", "without", "difference", "uniq", "indexOf", "lastIndexOf", "each", "map", "reduce", "reduceRight", "detect", "select", "reject", "all", "any", "include", "invoke", "pluck", "max", "min", "sortBy", "groupBy", "sortedIndex", "size", "head", "tail", "unique", "forEach", "inject", "foldl", "foldr", "filter", "every", "some", "contains"]);
install(Function, _, ["bind", "memoize", "delay", "defer", "throttle", "debounce", "once", "wrap", "compose"]);
install(Function, _, ["after"], -1);

_.map = lambdinate(_.map);
_.each = lambdinate(_.each);

