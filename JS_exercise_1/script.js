// Function to return max of two numbers
function max(a, b) {
    return a > b ? a : b;
}

// Function to return max of three numbers
function maxOfThree(a, b, c) {
    return Math.max(a, b, c);
}

// Function to check if a character is a vowel
function isVowel(char) {
    return "aeiouAEIOU".includes(char);
}

// Function to translate text into "rövarspråket"
function translate(text) {
    return text.replace(/([^aeiou\s])/gi, '$1o$1');
}

// Function to sum an array
function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}

// Function to multiply an array
function multiply(arr) {
    return arr.reduce((a, b) => a * b, 1);
}

// Function to reverse a string
function reverse(str) {
    return str.split('').reverse().join('');
}

// Bilingual lexicon object
const lexicon = {"merry": "god", "christmas": "jul", "and": "och", "happy": "gott", "new": "nytt", "year": "år"};

// Function to translate words using the lexicon
function translateToSwedish(phrase) {
    return phrase.split(' ').map(word => lexicon[word] || word).join(' ');
}

// Function to find the length of the longest word
function findLongestWord(words) {
    return Math.max(...words.map(word => word.length));
}

// Function to filter words longer than i
function filterLongWords(words, i) {
    return words.filter(word => word.length > i);
}

// Function to count character frequency
function charFreq(str) {
    return [...str].reduce((freq, char) => {
        freq[char] = (freq[char] || 0) + 1;
        return freq;
    }, {});
}

// Function to prompt user for names until cancel is hit
function getSortedNames() {
    let names = [];
    let name;
    while ((name = prompt("Enter a name (Cancel to stop):"))) {
        names.push(name);
    }
    alert("Sorted names: " + names.sort().join(', '));
}

// Function to generate random numbers and compute average
function generateRandomNumbers() {
    let count = parseInt(prompt("How many random numbers?"), 10);
    let numbers = Array.from({length: count}, () => Math.floor(Math.random() * 100));
    let avg = sum(numbers) / count;
    alert("Numbers: " + numbers.join(", ") + "\nAverage: " + avg);
}

// Function to validate registration form
function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let email = document.getElementById("email").value;
    let yearOfBirth = document.getElementById("yearOfBirth").value;
    let terms = document.getElementById("terms").checked;
    
    if (!username || !password || !confirmPassword || !email || !terms) {
        alert("All fields are required and terms must be accepted.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        alert("Invalid email format.");
        return false;
    }
    if (!(yearOfBirth >= 1900 && yearOfBirth <= 2000 && /^\d{4}$/.test(yearOfBirth))) {
        alert("Year of birth must be between 1900 and 2000.");
        return false;
    }
    return true;
}

// Function to handle form submission and display results
function handleSubmit(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let hometown = document.getElementById("hometown").value;
    let birthYear = new Date().getFullYear() - age;
    document.getElementById("output").innerHTML =
        `<p>Name: ${name}</p><p>Year of Birth: ${birthYear}</p>` +
        `<p><a href='https://www.google.com/search?q=${hometown}' target='_blank'>Search for ${hometown}</a></p>`;
}

// Rollover image function
function setupRollover() {
    let img = document.getElementById("rolloverImage");
    img.onmouseover = () => img.src = "image2.jpg";
    img.onmouseout = () => img.src = "image1.jpg";
}
