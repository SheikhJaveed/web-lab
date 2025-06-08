// Function to return max of two numbers
function max(a, b) {
    return a > b ? a : b;
}
console.log("Max of 2 and 3:", max(2, 3));

// Function to return max of three numbers
function maxOfThree(a, b, c) {
    return Math.max(a, b, c);
}
console.log("Max of 2, 3, and 5:", maxOfThree(2, 3, 5));

// Function to check if a character is a vowel
function isVowel(char) {
    return "aeiouAEIOU".includes(char);
}
console.log("Is 'A' a vowel?", isVowel('A'));
console.log("Is 'b' a vowel?", isVowel('b'));

// Function to translate text into "rövarspråket"
function translate(text) {
    return text.replace(/([^aeiou\s])/gi, '$1o$1');
}
console.log("Rövarspråket for 'hello':", translate('hello'));

// Function to sum an array
function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}
console.log("Sum of [1, 2, 3, 4]:", sum([1, 2, 3, 4]));

// Function to multiply an array
function multiply(arr) {
    return arr.reduce((a, b) => a * b, 1);
}
console.log("Product of [2, 3, 4]:", multiply([2, 3, 4]));

// Function to reverse a string
function reverse(str) {
    return str.split('').reverse().join('');
}
console.log("Reverse of 'JavaScript':", reverse('JavaScript'));

// Bilingual lexicon object
const lexicon = {"merry": "god", "christmas": "jul", "and": "och", "happy": "gott", "new": "nytt", "year": "år"};

// Function to translate words using the lexicon
function translateToSwedish(phrase) {
    return phrase.split(' ').map(word => lexicon[word] || word).join(' ');
}
console.log("Translate 'merry christmas and happy new year' to Swedish:", translateToSwedish('merry christmas and happy new year'));

// Function to find the length of the longest word
function findLongestWord(words) {
    return Math.max(...words.map(word => word.length));
}
console.log("Longest word length in ['apple', 'banana', 'cherry']:", findLongestWord(['apple', 'banana', 'cherry']));

// Function to filter words longer than i
function filterLongWords(words, i) {
    return words.filter(word => word.length > i);
}
console.log("Words longer than 5 in ['apple', 'banana', 'cherry']:", filterLongWords(['apple', 'banana', 'cherry'], 5));

// Function to count character frequency
function charFreq(str) {
    return [...str].reduce((freq, char) => {
        freq[char] = (freq[char] || 0) + 1;
        return freq;
    }, {});
}
console.log("Character frequency in 'banana':", charFreq('banana'));

// Function to handle form submission and display results
function handleSubmit(event) {
    event.preventDefault();  // Prevent the default form submission
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let hometown = document.getElementById("hometown").value;
    let birthYear = new Date().getFullYear() - age;  // Calculate the birth year
    document.getElementById("output").innerHTML =
        `<p>Name: ${name}</p><p>Year of Birth: ${birthYear}</p>` +
        `<p><a href='https://www.google.com/search?q=${hometown}' target='_blank'>Search for ${hometown}</a></p>`;
}

// Rollover image function
function setupRollover() {
    let img = document.getElementById("rolloverImage");
    img.onmouseover = () => img.src = "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png";  // Change image on hover
    img.onmouseout = () => img.src = "https://d2jdgazzki9vjm.cloudfront.net/images/javascript/javascript_logo.png";  // Reset image when mouse leaves
}

// Initialize the rollover effect
setupRollover();
