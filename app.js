// PASSWORD GENERATOR

// Character Generator Function

// Function that accepts a string value as an argument and returns a random index number from a string argument
function randomIndex(str) {
    return Math.floor(Math.random() * str.length);
}
// Example of the randomIndex function
console.log(randomIndex(`example`)); // 0, 1, 2, 3, 4, 5, 6

// Function that returns a random letter using a random index in the "letters" string
function getRandomLower() {
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    // Returning a random letter using a random index in the "letters" string
    return letters[randomIndex(letters)];
}
console.log(getRandomLower());

// Function that returns a random uppercase letter
function getRandomUpper() {
    // Running the "getRandomLower" function to create a random letter and setting that value to the letter variable
    const letter = getRandomLower();
    // Changing the random letter to an uppercase letter and returning it from the function
    return letter.toUpperCase();
}
console.log(getRandomUpper());

// Function that returns a random number as a string value
function getRandomNumber() {
    const numbers = `0123456789`;
    // Returning a random number using a random index in the "numbers" string
    return numbers[randomIndex(numbers)];
}
console.log(getRandomNumber());

// Function that returns a random symbol as a string value 
function getRandomSymbol() {
    const symbols = `!@#$%^&*(){}[]=<>/,.`
    // Returning a random symbols using a random index in the "symbols" string 
    return symbols[randomIndex(symbols)];
}
console.log(getRandomSymbol());


// Object to store all the character generator functions
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};


// Selection the DOM Elements
const resultEL = document.querySelector(`#result`);
const clipboardEL = document.querySelector(`#clipboard`);
const lowercaseEL = document.querySelector(`#lowercase`);
const uppercaseEL = document.querySelector(`#uppercase`);
const numbersEL = document.querySelector(`#numbers`);
const symbolsEL = document.querySelector(`#symbols`);
const lengthEL = document.querySelector(`#length`);
const generateEL = document.querySelector(`#generate`);