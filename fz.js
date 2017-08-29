// source: http://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property

// we have an array of objects, we want to remove one object using only the id property
var apps = [{id:34,name:'My App',another:'thing'},{id:37,name:'My New App',another:'things'}];

// get index of object with id:37
var removeIndex = apps.map(function(item) { return item.id; }).indexOf(34);

// remove object
console.log(apps.splice(removeIndex, 1));