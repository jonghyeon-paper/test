/**
 * grid archive
 * - DataTable
 * 
 * author jonghyeon
 * since 2016.11.09.
 */
var gridArchive = {};

gridArchive.innerFunction = function() {
	alert(333);
}

var gridArchive2 = (function() {
	return {
		innerFunction : function() {
			alert(123);
		}
	};
}());

$(function() {
	console.log(typeof gridArchive);
	console.log(typeof gridArchive.innerFunction);
	gridArchive.innerFunction();
	console.log(typeof gridArchive2);
	console.log(typeof gridArchive2.innerFunction);
	gridArchive2.innerFunction();
});

