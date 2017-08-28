const people = [
    { name: "Tobi", age: 21, married: false },
    { name: "Keith", age: 22, married: true},
    { name: "John", age: 22, married: true}
  ];


const filter = people.filter(function(x){
    return x.married === true
})

console.log(filter)