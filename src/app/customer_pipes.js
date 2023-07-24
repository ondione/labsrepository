
class Customer {
    firstName: string;
    lastName: string;
    age: number;
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

class Customer1 {
    firstName: string;
    constructor(firstName) {
        this.firstName = firstName;
    }
}
const customer = new Customer1(123);
customer.firstName.toUpperCase();  // erreur a l'execution firstname est de type numeric
