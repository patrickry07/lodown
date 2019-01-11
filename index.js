'use strict';


/**
* START OF OUR LIBRARY!
*/

/**  identity_.identity(value) 
Returns the same value that is used as the argument. In math: f(x) = x
This function looks useless, but is used throughout Underscore as a default iteratee.

var stooge = {name: 'moe'};
stooge === _.identity(stooge);
=> true


 * identity: Returns <value> unchanged

Parameter 1)Any value

*/

function identity(value) {
    //return value unchanged
    return value;
}
module.exports.identity = identity;


/**     typeOf: Return the type of <value> as a string
*       Parameter 1) Any value
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


/**   first_.first(array, [n]) Aliases: head, take 
Returns the first element of an array. Passing n will return the first n elements of the array.

_.first([5, 4, 3, 2, 1]);
=> 5  




 * first: 1) If <array> is not an array, returns []
*           2) If <number> is not given or not a number, returns just the first element in <array>.
*           3) Otherwise, returns the first <number> items of <array>
* Arguments:
*   1) An array
*   2) A number
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


/**last_.last(array, [n]) 
Returns the last element of an array. Passing n will return the last n elements of the array.

_.last([5, 4, 3, 2, 1]);
=> 1 
 * 
 * 
 * last:   1) If <array> is not an array, returns []
*           2) If <number> is not given or not a number, returns just the last element in <array>.
*           3) Otherwise, returns the last <number> items of <array>
* Arguments:
*   1) An array
*   2) A number

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

/**indexOf_.indexOf(array, value, [isSorted]) 
Returns the index at which value can be found in the array, or -1 if value is not present in the array. If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.

_.indexOf([1, 2, 3], 2);
=> 1
 * 
 * 
 * 
 _.indexOf:*     1) Returns the index of <array> that is the first occurrance of <value>
*                   2) Returns -1 if <value> is not in <array>
* Arguments:
*                   1) An array
*                   2) A value

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


/**  contains_.contains(list, value, [fromIndex]) Aliases: include, includes 
    Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

    _.contains([1, 2, 3], 3);
    => true 
 * 
 * 
 * contains:    1) Returns true if <array> contains <value>
*                   2) Returns false otherwise
* Arguments:
*                   1) An array
*                   2) A value
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


/** each_.each(list, iteratee, [context]) Alias: forEach 
Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.

_.each([1, 2, 3], alert);
=> alerts each number in turn...
_.each({one: 1, two: 2, three: 3}, alert);
=> alerts each number value in turn...
 * 
 * 
 * 
 * _.each:   1) if <collection> is an array, calls <function> once for each element
*               with the arguments:
*               the element, it's index, <collection>
*             2) if <collection> is an object, calls <function> once for each property
*               with the arguments:
*               the property's value, it's key, <collection>
* Arguments:
*             1) A collection
*             2) A function
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


/** unique_.unique(array, [isSorted], [iteratee])
Produces a duplicate-free version of the array, using === to test object equality. In particular only the first occurrence of each value is kept. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iteratee function.

_.uniq([1, 2, 1, 4, 1, 3]);
=> [1, 2, 4, 3]
 * 
 * _.unique:   1) Returns a new array of all elements from <array> with duplicates removed

* Arguments:
*               1) An array

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

/**filter_.filter(list, predicate, [context])
Looks through each value in the list, returning an array of all the values that pass a truth test (predicate). predicate is transformed through iteratee to facilitate shorthand syntaxes.

var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [2, 4, 6]
 * 
 * 
 * 
 * _.filter:    1) call <function> for each element in <array> passing the arguments:
*                   the element, it's index, <array>
*                2) return a new array of elements for which calling <function> returned true
* Arguments:
            *    1) An array
            *    2) A function
*/

function filter(array, fn){
  var arr = [];
  each(array, function(e,i,a){
      if (fn(e,i,a)) arr.push(e);
  });
return arr;
}
module.exports.filter = filter;


/**reject_.reject(list, predicate, [context]) 
Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter. predicate is transformed through iteratee to facilitate shorthand syntaxes.

var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [1, 3, 5] 
 * 
 * _reject:    1) call <function> for each element in <array> passing the arguments:
*                  the element, it's index, <array>
*               2) return a new array of elements for which calling <function> returned false
*               3) This is the logical inverse if _.filter(), you must use _.filter() in your implementation
* Arguments:
                1) An array
                2) A function

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



/**partition_.partition(list, predicate) 
Split list into two arrays: one whose elements all satisfy predicate and one whose elements all do not satisfy predicate. predicate is transformed through iteratee to facilitate shorthand syntaxes.

_.partition([0, 1, 2, 3, 4, 5], isOdd);
=> [[1, 3, 5], [0, 2, 4]]
 * 
 * 
 * _.partition:   1) Call <function> for each element in <array> passing it the arguments:
*                     element, key, <array>
*                  2) Return an array that is made up of 2 sub arrays:
*                  3) An array that contains all the values for which <function> returned something truthy
*                  4) An array that contains all the values for which <function> returned something falsy
* Arguments:
                *   1) An array
                *   2) A function

*/

function partition(array, fn){
    return [filter(array,fn),reject(array,fn)];
}
module.exports.partition = partition;


/**map_.map(list, iteratee, [context]) Alias: collect 
Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
_.map([[1, 2], [3, 4]], _.first);
=> [1, 3]
 * 
 * 
 * _.map: *   1) calls <function> for each element in <collection> passing the arguments:
*               if <collection> is an array:
*               the element, it's index, <collection>
*               if <collection> is an object:
*               the value, it's key, <collection>
* *             2) saves the return value of each <function> call in a new array
*               3) returns the new array
* Arguments:
*               1) A collection
*               2) a function
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

/**  pluck_.pluck(list, propertyName) 
A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
=> ["moe", "larry", "curly"]
 * 
 * 
 * 
 * pluck:*     1) Returns an array containing the value of <property> for every element in <array>
* Arguments:
*               1) An array of objects
*               2) A property
*/

function pluck(array, property){
    return map(array,x => x[property]);
}

module.exports.pluck = pluck;
                        


/** every_.every(list, [predicate], [context]) Alias: all 
Returns true if all of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a false element is found. predicate is transformed through iteratee to facilitate shorthand syntaxes.

_.every([2, 4, 5], function(num) { return num % 2 == 0; });
=> false
 * 
 * 
 * every:    1) Calls <function> for every element of <collection> with the paramaters:
*                   if <collection> is an array:
*                   current element, it's index, <collection>
*                   if <collection> is an object:
*                   current value, current key, <collection>
*               2) If the return value of calling <function> for every element is true, returns true
*               3) If even one of them returns false, returns false
*               4) If <function> is not provided, returns true if every element is truthy, otherwise return false
* Arguments:
*               1) A collection
*               2) A function


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

/** some_.some(list, [predicate], [context]) Alias: any 
Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found. predicate is transformed through iteratee to facilitate shorthand syntaxes.

_.some([null, 0, 'yes', false]);
=> true
 * 
 * 
 * 
 * some:       1) Call <function> for every element of <collection> with the paramaters:
*                   if <collection> is an array:
*                   current element, it's index, <collection>
*                   if <collection> is an object:
*                   current value, current key, <collection>
*               2) If the return value of calling <function> is true for at least one element, return true
*               3) If it is false for all elements, return false
*               4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Arguments:
*               1) A collection
*               2) A function

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


/**  reduce_.reduce(list, iteratee, [memo], [context]) Aliases: inject, foldl 
Also known as inject and foldl, reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.

If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.

var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6
 * 
 * 
 * 
 * reduce:   1) Calls <function> for every element in <collection> passing the arguments:
*                   previous result, element, index
*               2) Use the returns value of <function> as the "previous result"
*                   for the next iteration
*               3) On the very first iteration, uses <seed> as the "previous result"
*               4) If no <seed> was given, uses the first element/value of <collection> as <seed> and continue to the next element
*               5) After the last iteration, returns the return value of the final <function> call
* Arguments:
*   1) An array
*   2) A function
*   3) A seed


*/

function reduce(array, fn, seed){
    var sum;
    if (seed === undefined || seed === 'null'){
        sum = array[0]; console.log(array[0]);
        for(var j = 1; j < array.length; j++){
            sum = fn(sum, array[j], j);
            console.log(sum);
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

/** extend_.extend(destination, *sources) 
Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.

_.extend({name: 'moe'}, {age: 50});
=> {name: 'moe', age: 50}
 * 
 * 
 * extend_.extend(destination, *sources) 
Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.

_.extend({name: 'moe'}, {age: 50});
=> {name: 'moe', age: 50}
 * 
 * 
 * extend:   1) Copy properties from <object 2> to <object 1>
*               2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*               3) Return the update <object 1>
* Arguments:
*               1) An Object
*               2) Any number of objects to be added to parament 1 object



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