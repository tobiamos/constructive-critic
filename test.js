const faker = require('faker');
function createPassword(){
    return  `CC` + faker.internet.password() + `9z@#`;
}

const password = createPassword();
console.log(password);