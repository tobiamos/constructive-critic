const people = [
  { name: "Tobi", age: 21, married: false },
  { name: "Keith", age: 22, married: false }
];
const index = people.indexOf("Keith");
const keith = people.pop("Keith");
console.log(people);
keith.married === true ? (keith.married = false) : (keith.married = true);
people.push(keith);
console.log(people);
