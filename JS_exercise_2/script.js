// The Calculator Functions
function squareNumber(num) {
    let result = num * num;
    console.log(`The result of squaring the number ${num} is ${result}.`);
    return result;
}

function halfNumber(num) {
    let result = num / 2;
    console.log(`Half of ${num} is ${result}.`);
    return result;
}

function percentOf(num1, num2) {
    let result = (num1 / num2) * 100;
    console.log(`${num1} is ${result}% of ${num2}.`);
    return result;
}

function areaOfCircle(radius) {
    let result = Math.PI * radius * radius;
    console.log(`The area for a circle with radius ${radius} is ${result.toFixed(2)}.`);
    return result.toFixed(2);
}

function complexCalculation(num) {
    let half = halfNumber(num);
    let squared = squareNumber(half);
    let area = areaOfCircle(squared);
    let percentage = percentOf(area, squared);
}

// MixUp Function
function mixUp(str1, str2) {
    return str2.slice(0, 2) + str1.slice(2) + ' ' + str1.slice(0, 2) + str2.slice(2);
}

// FixStart Function
function fixStart(str) {
    let firstChar = str[0];
    let regex = new RegExp(firstChar, 'g');
    return firstChar + str.slice(1).replace(regex, '*');
}

// Verbing Function
function verbing(str) {
    if (str.length >= 3) {
        return str.endsWith('ing') ? str + 'ly' : str + 'ing';
    }
    return str;
}

// Not Bad Function
function notBad(sentence) {
    let notIndex = sentence.indexOf('not');
    let badIndex = sentence.indexOf('bad');
    if (notIndex !== -1 && badIndex !== -1 && badIndex > notIndex) {
        return sentence.slice(0, notIndex) + 'good' + sentence.slice(badIndex + 3);
    }
    return sentence;
}

// Pluralizer Function
function pluralize(noun, number) {
    let irregularNouns = { sheep: 'sheep', goose: 'geese' };
    let pluralNoun = irregularNouns[noun] || (number !== 1 ? noun + 's' : noun);
    return `${number} ${pluralNoun}`;
}

// The Array
let choices = ['blue', 'red', 'green'];
choices.forEach((choice, index) => {
    let suffixes = ['st', 'nd', 'rd', 'th'];
    let suffix = index < 3 ? suffixes[index] : suffixes[3];
    console.log(`My ${index + 1}${suffix} choice is ${choice}.`);
});

// Word Guessing Game
let word = ['F', 'O', 'X'];
let guessed = ['_', '_', '_'];
function guessLetter(letter) {
    let correct = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            guessed[i] = letter;
            correct = true;
        }
    }
    console.log(guessed.join(' '));
    if (!guessed.includes('_')) {
        console.log('Congratulations! You won!');
    }
}

// Recipe Card
let recipe = {
    title: 'Mole',
    servings: 2,
    ingredients: ['cinnamon', 'cumin', 'cocoa']
};
console.log(`${recipe.title}\nServes: ${recipe.servings}\nIngredients:\n${recipe.ingredients.join('\n')}`);

// The Reading List
let books = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', alreadyRead: true },
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', alreadyRead: false }
];
books.forEach(book => {
    console.log(`You ${book.alreadyRead ? 'already read' : 'still need to read'} "${book.title}" by ${book.author}.`);
});

// Movie Database
let favoriteMovie = {
    title: 'Inception',
    duration: 148,
    stars: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
};
console.log(`${favoriteMovie.title} lasts for ${favoriteMovie.duration} minutes. Stars: ${favoriteMovie.stars.join(', ')}.`);

// Cash Register
function cashRegister(cart) {
    return Object.values(cart).reduce((total, price) => total + parseFloat(price), 0);
}
let cartForParty = { banana: '1.25', handkerchief: '.99', Tshirt: '25.01', apple: '0.60', nalgene: '10.34', proteinShake: '22.36' };
console.log(cashRegister(cartForParty));

// Credit Card Validation
function validateCreditCard(cardNumber) {
    let num = cardNumber.replace(/-/g, '');
    if (!/\d{16}/.test(num)) return { valid: false, number: cardNumber, error: 'wrong_length' };
    if (new Set(num).size < 2) return { valid: false, number: cardNumber, error: 'only_one_digit' };
    if (num[num.length - 1] % 2 !== 0) return { valid: false, number: cardNumber, error: 'last_digit_odd' };
    if ([...num].reduce((sum, digit) => sum + parseInt(digit), 0) <= 16) return { valid: false, number: cardNumber, error: 'sum_too_low' };
    return { valid: true, number: cardNumber };
}

testCases = [3, 5, 2, 4];
testCases.forEach(num => {
    squareNumber(num);
    halfNumber(num);
    percentOf(num, 10);
    areaOfCircle(num);
});
console.log(mixUp('mix', 'pod'));
console.log(fixStart('babble'));
console.log(verbing('swim'));
console.log(notBad('This dinner is not that bad!'));
console.log(pluralize('cat', 5));
console.log(validateCreditCard('9999-9999-8888-0000'));
guessLetter('O');
guessLetter('X');
