const people = [
    { name: "Tobi", age: 21, married: false },
    { name: "Keith", age: 22, married: true},
    { name: "John", age: 22, married: true}
  ];
const fav = [];

 people.forEach(function(person){
     if(person.married){
         fav.push(person);
     }
 })

 console.log(fav);
 