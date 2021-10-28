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
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

// Function that accepts true or false values as well as a number as arguments
// NOTE: The Checkbox inputs and number input will determine the value/arguments entered into this function
function generatePassword(lower, upper, number, symbol, length) {
    
    console.log(lower, upper, number, symbol, length);
    
    // 1. CREATE THE PASSWORD VARIABLE
    let generatedPassword = ``;

    // 2. FILTER OUT UNCHECKED OPTIONS
    // True and false values can be added together (True is 1 and false is 0)
    // NOTE: The value set to typesCount will be used when building the password
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    // If the user has not selected any of the 4 options, then displays an alert and return an empty string from the function so the password displayed will be an empty string
    if (typesCount === 0){
        alert(`Please select at least one option`);
        return ``;
    }

    // Creating an array of arrays. The first item in each nester array holds the value of a string that will be used to access a function it the randomFunction object. Also, the second item in each nested array is one of the values passed into this generatePassword function.
    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];

    // The filter method creates a new array with all the items that pass the test implemented by the provided function (AKA all the items that cause the function to return a boolean value of true when the function is run)
    // Checking if the value for index of 1 in each item in teh array is true or false. Also, removing the item from the array if it is false
    typesArr.filter(item => {
        console.log(item[1]);
        return item[1];
    });
    console.log(`typesArr;`, typesArr);

    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION
    // Building password with a for loop 
    // NOTE: The value for "length" is the value selected for the length number input
    for (i = 0; i < length; i += typesCount){
        // One of the items in the updated/filtered version of the typesArr will be the value/argument passed into for the type parameter each time the anonymous arrow function is run/executed
        typesArr.forEach(type => {
            const funcName = type[0];
            console.log(funcName);
            // Accessing and running/executing a function in the randomFunctions object. Also, adding the value returned from the accessed function to the generatedPassword string variable.
            generatedPassword += randomFunctions[funcName]();
            console.log(generatedPassword);
        });
    }

    // 4. ADD THE GENERATED PASSWORD TO THE FINAL VARIABLE AND RETURN IT FROM THE FUNCTION  
    // Removing extra characters if necessary (The above loop will create a password that may not match the length selected if that length is not a multiple of the number of options/checkboxes selected)
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);
    return finalPassword;
}


// Example of generatePassword function
// NOTE: Using the starting value for when the page first loads
generatePassword(true, true, true, true, 10);


// Event Listener for when the "Generate Password" button is clicked
generateEl.addEventListener(`click`, () => {
    // Checked if the following options/checkboxes are selected/checked and setting the true or false values to the respective variables
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Accessing the value for the number input and changing the value from a string to a number
    // NOTE: The value returned from a number input is a string value
    const length = parseInt(lengthEl.value);

    console.log(hasLower, hasUpper, hasNumber, hasSymbol, length);

    // The generatePassword function takes the true/false values determined be the checkboxes as well as the number from the number input as arguments and returns a string (AKA the Password) which is set as the innerText value for the "result" element
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// COPY PASSWORD
clipboardEl.addEventListener(`click`, () => {
    // Creating a textarea element which will be used to put the password inside of so that it can be selected and copied
    const textarea = document.createElement(`textarea`);

    // Accessing the text/string value for the "result" span and setting it to the password variable
    const password = resultEl.innerText;

    // If the user clicks the clipboard while no password is displayed the function will end and nothing will be copied to the clipboard
    if (password === ``){
        alert(`Please generate a password first`);
        return;
    }

    // Setting the value for the textarea to the password that is currently being displayed
    textarea.value = password;

    // Selecting the body element
    const body = document.querySelector(`body`);

    // Adding the textarea to the webpage
    body.append(textarea);

    // Using the select method which selects (AKA Focuses in on) an element. This will highlight/select the value (AKA password) inside the textarea.
    textarea.select();

    // Using execCommand to copy the selected value
    document.execCommand(`copy`);

    // Removes the textarea element from the webpage/document
    textarea.remove();

    alert(`Password has been copied to the clipboard`);
});