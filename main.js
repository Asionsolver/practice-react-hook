const person = { name: "Ashis" };

function greet(greeting) {
    console.log(`${greeting}, ${this.name}`);
}

greet.call(person, "Hello"); // Output: Hello, Ashis
