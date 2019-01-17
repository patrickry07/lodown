'use strict';


/**
* START OF OUR LIBRARY!
*/

/**  
identity: Returns the same value that is used as the argument. In math: f(x) = x
This function looks useless, but is used throughout Underscore as a default iteratee.
Returns <value> unchanged
@Param {Any value}
*/

function identity(value) {
    return value;
}
module.exports.identity = identity;

/** 
typeOf:returns a string indicating the type of the unevaluated operand.
Returns the type of value as a string
@Param {Any value}
*/

function typeOf (value){
    if (value === null){
        return 'null';
    }else if (Array.isArray(value)){
        return 'array';
    }else{
        return typeof value;
    }
}
module.exports.typeOf = typeOf;


/**   
first: Returns the first element of an array. Passing n will return the first n elements of the array.
If array is not an array, returns []. If {number} is not given or not a number, returns just the first element in {array}.
Otherwise, returns the first <number> items of {array}
@Param An array
@Param A number
*/

function first(array, number){
    var arr = [];
    if (!Array.isArray(array)){
        return [];
    }
    if (typeof number !== 'number'){
        return array[0];
    }else if (number > array.length){
        return array;
    }else if (number < 0){
        return [];
    }else {
        for (var i = 0; i < number; i++){
            arr.push(array[i]);
        }
        return arr;
    }
}
module.exports.first = first;


/**
last: Returns the last element of an array. Passing n will return the last n elements of the array.
If {array} is not an array, returns [], if {number} is not given or not a number, returns just the last element in {array}.
Otherwise, returns the last {number} items of <array>
@Param {An array}
@Param {A number}
*/

function last(array, number){
    if (!Array.isArray(array)){
        return [];
    }
    if (typeof number !== 'number'){
        return array[array.length - 1];
    }else if (number > array.length){
        return array;
    }else if (number < 0){
        return [];
    }else {
        return array.slice(array.length - number);
        }
}
module.exports.last = last;

/**
indexOf: Returns the index at which value can be found in the array, or -1 if value is not present in the array. 
Returns the index of <array> that is the first occurrance of <value>
Returns -1 if <value> is not in <array>
@Param An array
@Param A value
*/

function indexOf(array, value){
    for (var i = 0; i < array.length; i++){
        if (array[i] === value){
            return i;
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;


/**  
contains:Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.
Returns true if {array} contains {value}, and returns false otherwise
@Param An array
@Param A value
*/

function contains(array, value){
    for (var i = 0; i < array.length; i++){
        if (array[i] === value){
            return true;
        }
    }
    return false;
}
module.exports.contains = contains;


/**
each: Designed to loop over a collection, Array or Object, and applies the
action Function to each value in the collection.
@param {Array or Object} collection: The collection over which to iterate.
@param {Function} action: The Function to be applied to each value in the
collection
*/

function each(collection, fn){
    var arr1 = [];
    if (Array.isArray(collection)){
        for (var i = 0; i < collection.length; i++){
            fn(collection[i], i, collection);
            
        }
    }else if (typeof collection === 'object' && collection !== null){
        for (let key in collection) {
            fn(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/** 
unique: Produces a duplicate-free version of the array, using === to test object equality. 
In particular only the first occurrence of each value is kept.
Returns a new array of all elements from {array} with duplicates removed
@Param {An array}
*/

function unique(array){
  var arr = [];
  var arr2 = [];
  for (var i = 0; i < array.length; i++){
    arr.push(indexOf(array, array[i]));
    
  }
  for (var j = 0; j < arr.length; j++){
    if (arr[j] === j){
      arr2.push(array[j]);
    }
  }
return arr2;
}

module.exports.unique = unique;

/**
filter: Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
Returns a new array of elements for which calling <function> returned true
@Param {An array}: The collection whose elements are tested.
@Param {A function}: calls {function} for each element in {array} passing the arguments: the {element}, {index}, {array}
*/

function filter(array, fn){
  var arr = [];
  each(array, function(e,i,a){
      if (fn(e,i,a)) arr.push(e);
  });
return arr;
}
module.exports.filter = filter;


/**
reject: Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.
Returns a new array of elements for which calling {function} returned false
@Param {An array}: The collection whose elements are tested.
@Param {A function}: calls {function} for each element in {array} passing the arguments: the {element}, {index}, {array}
*/

function reject(array, fn){
  var arr = array.slice();
  var arr2 = [];
  var rej = filter(array, fn);
  for (var i = 0; i < rej.length; i++){
    for (var j = 0; j < array.length; j++ ){
      if (rej[i] === array[j]){
        delete arr[j];
      }
    }
  }    
    for (var k = 0; k < arr.length; k++){
      if(arr[k] !== undefined){
        arr2.push(arr[k]);
      }
    }
  return arr2;
}

module.exports.reject = reject;



/**
partition: Split list into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate.
Returns an array that is made up of 2 sub arrays:
    1)An array that contains all the values for which <function> returned something truthy
    2)An array that contains all the values for which <function> returned something falsy
@Param {An array}: The collection whose elements are tested.
@Param {A function}: calls {function} for each element in {array} passing the arguments: the {element}, {index}, {array}
*/

function partition(array, fn){
    return [filter(array,fn),reject(array,fn)];
}
module.exports.partition = partition;


/**\
map: Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.
Returns the value of each <function> call in a new array
@Param {A collection}: An array or object
@Param {a function}: calls {function} for each element in {collection} passing the arguments:  if {collection} === arr: the element, it's index, {collection}
                    if {collection} is an object: current value, current key, <collection>
*/

function map(collection, fn){
  var arr = [];
  var arr2 = [];
  each(collection, function(e,i,a){
      arr.push(fn(e,i,a)); 
      
  });
return arr;
}

module.exports.map = map;

/**  
pluck: A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.
Returns an array containing the value of {property} for every element in <array>
@Param {An array of objects}: array which has objects inside
@Param {A property}: key name which we are looking for values of
*/

function pluck(array, property){
    return map(array,x => x[property]);
}

module.exports.pluck = pluck;
                        


/** 
every: Returns true if all of the values in the list pass the predicate truth test. 
Short-circuits and stops traversing the list if a false element is found.
If the return value of calling {function} for every element is true, returns true
If even one of them returns false, returns false
If {function} is not provided, returns true if every element is truthy, otherwise return false
@Param {A collection}: The collection whose elements are tested.
@Param {A function}:Calls {function} for every element of <collection> with the paramaters: if {collection} === array: element, index, {collection}
                    if {collection} is an object: current value, current key, <collection>
*/

function every(collection, fn){
    if (typeof fn === 'function'){
        var map1 = map(collection,fn);
        for (var i = 0; i < map1.length; i++){
            if (map1[i] === false){
                return false;
            }
        }
        return true;
    }else{
        for (var j = 0; j < collection.length; j++){
            if (collection[j] === true){
                return true;
            
            }else if(collection[j] === false){
                return false;
            }
        }
    }
}

module.exports.every = every;

/** 
some: Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.
If the return value of calling {function} is true for at least one element, returns true
If it is false for all elements, returns false
If {function} is not provided return true if at least one element is truthy, otherwise returns false
@Param: {A collection}: The collection whose elements are tested.
@Param: {A function}:Calls {function} for every element of <collection> with the paramaters: if {collection} === array: element, index, {collection}
                    if {collection} is an object: current value, current key, <collection>
*/

function some(collection, fn){
    if (typeof fn === 'function'){
        var map1 = map(collection,fn)
        for (var i = 0; i < map1.length; i++){
            if (map1[i] === true){
                return true
            }
        }
        return false
    }else{
        for (var j = 0; j < collection.length; j++){
            if (collection[j] === true){
                return true;
            
            }else if(collection[j] === false){
                return false;
            }
        }
    }
}

module.exports.some = some;


/**  
reduce: Also known as inject and fold, reduce boils down a list of values into a single value.
After the last iteration, returns the return value of the final {function} call
@Param: {An array}: The array whose elements are reduced
@Param: {A function}: Calls {function} for every element in {collection} passing the arguments: previous result, element, index.
                    Use the returns value of {function} as the "previous result" for the next iteration
@Param: {A seed}: On the very first iteration, uses {seed} as the "previous result"
                    If no {seed} was given, uses the first element/value of {collection} as {seed} and continue to the next element
*/

function reduce(array, fn, seed){
    var sum;
    if (seed === undefined || seed === 'null'){
        sum = array[0];
        for(var j = 1; j < array.length; j++){
            sum = fn(sum, array[j], j);
        }
    }else{
        for (var i = 0; i < array.length; i++){
            if (i === 0){
                sum = fn(seed, array[i], i);
            }else{
                sum = fn(sum, array[i], i);
            }
        }
    }
    return sum;
}

module.exports.reduce = reduce;

/** 
extend: Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. 
Any nested objects or arrays will be copied by reference, not duplicated. 
It's in-order, so the last source will override properties of the same name in previous arguments.
Returns the update {object 1}
@Param {An Object}: Copy properties to the first Obj from the later Objects.
@Param {Any number of objects}: If more objects are passed in, copy their properties to {object 1} as well, in the order they are passed in.
*/

function extend(obj1){
    for (var i = 0;i < arguments.length; i++){
            for (var key in arguments[i+1]){
                obj1[key] = arguments[i+1][key];
            }
    }
    return obj1;
} 
module.exports.extend = extend;