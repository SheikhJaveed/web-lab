// --- The Calculator ---
function squareNumber(num) {
    const result = num * num;
    console.log(`The result of squaring the number ${num} is ${result}.`);
    return result;
  }
  
  function halfNumber(num) {
    const result = num / 2;
    console.log(`Half of ${num} is ${result}.`);
    return result;
  }
  
  function percentOf(num1, num2) {
    const result = (num1 / num2) * 100;
    console.log(`${num1} is ${result}% of ${num2}.`);
    return result;
  }
  
  function areaOfCircle(radius) {
    const area = Math.PI * radius * radius;
    const rounded = area.toFixed(2);
    console.log(`The area for a circle with radius ${radius} is ${rounded}.`);
    return parseFloat(rounded);
  }
  
  function allOperations(num) {
    const half = halfNumber(num);
    const squared = squareNumber(half);
    const area = areaOfCircle(squared);
    const percent = percentOf(area, squared * squared);
    return percent;
  }
  
  // --- MixUp ---
  function mixUp(str1, str2) {
    return str2.slice(0, 2) + str1.slice(2) + ' ' + str1.slice(0, 2) + str2.slice(2);
  }
  
  // --- FixStart ---
  function fixStart(str) {
    const firstChar = str[0];
    const regex = new RegExp(firstChar, 'g');
    return firstChar + str.slice(1).replace(regex, '*');
  }
  
  // --- Verbing ---
  function verbing(str) {
    if (str.length >= 3) {
      return str.endsWith('ing') ? str + 'ly' : str + 'ing';
    }
    return str;
  }
  
  // --- Not Bad ---
  function notBad(str) {
    const notIndex = str.indexOf('not');
    const badIndex = str.indexOf('bad');
    if (notIndex !== -1 && badIndex > notIndex) {
      return str.slice(0, notIndex) + 'good' + str.slice(badIndex + 3);
    }
    return str;
  }
  
  // --- Pluralizer ---
  function pluralize(noun, number) {
    let plural = noun;
    const irregulars = { sheep: 'sheep', goose: 'geese' };
    if (number !== 1) {
      plural = irregulars[noun] || noun + 's';
    }
    return `${number} ${plural}`;
  }
  
  // --- The Array ---
  const topChoices = ['blue', 'green', 'red'];
  topChoices.forEach((choice, i) => {
    const suffix = (i + 1) === 1 ? 'st' : (i + 1) === 2 ? 'nd' : (i + 1) === 3 ? 'rd' : 'th';
    console.log(`My ${i + 1}${suffix} choice is ${choice}.`);
  });
  
  // --- Simple word guessing game ---
  const word = ['F', 'O', 'X'];
  let guessed = ['_', '_', '_'];
  let reward = 0;
  let guessedLetters = new Set();
  let hangmanState = 0;
  
  function guessLetter(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.has(letter)) {
      console.log(`You already guessed "${letter}".`);
      return;
    }
    guessedLetters.add(letter);
    let correct = false;
    let rewardThisTurn = Math.floor(Math.random() * 100);
    word.forEach((l, i) => {
      if (l === letter) {
        guessed[i] = letter;
        correct = true;
      }
    });
    console.log(guessed.join(''));
    if (correct) {
      reward += rewardThisTurn;
      console.log(`Congrats! You found a letter. Reward: $${rewardThisTurn}. Total: $${reward}`);
      if (!guessed.includes('_')) {
        console.log(`You won! Final word: ${guessed.join('')}, Reward: $${reward}`);
      }
    } else {
      reward -= rewardThisTurn;
      hangmanState++;
      console.log(`Wrong guess. You lost $${rewardThisTurn}. Total: $${reward}`);
      if (hangmanState >= 6) {
        console.log("Game over! Hangman is complete.");
      }
    }
  }
  
  // --- The Recipe Card ---
  const recipe = {
    title: "Mole",
    servings: 2,
    ingredients: ["cinnamon", "cumin", "cocoa"]
  };
  console.log(recipe.title);
  console.log(`Serves: ${recipe.servings}`);
  console.log("Ingredients:");
  recipe.ingredients.forEach(ing => console.log(ing));
  
  // --- The Reading List ---
  const books = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", alreadyRead: true },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", alreadyRead: false }
  ];
  books.forEach(book => {
    const info = `"${book.title}" by ${book.author}`;
    if (book.alreadyRead) {
      console.log(`You already read ${info}`);
    } else {
      console.log(`You still need to read ${info}`);
    }
  });
  
  // --- The Movie Database ---
  const favoriteMovie = {
    title: "Puff the Magic Dragon",
    duration: 30,
    stars: ["Puff", "Jackie", "Living Sneezes"]
  };
  function printMovie(movie) {
    console.log(`${movie.title} lasts for ${movie.duration} minutes. Stars: ${movie.stars.join(', ')}.`);
  }
  printMovie(favoriteMovie);
  
  // --- The Cash Register ---
  function cashRegister(cart) {
    let total = 0;
    for (let item in cart) {
      total += parseFloat(cart[item]);
    }
    return total;
  }
  const cartForParty = {
    banana: "1.25",
    handkerchief: ".99",
    Tshirt: "25.01",
    apple: "0.60",
    nalgene: "10.34",
    proteinShake: "22.36"
  };
  console.log(cashRegister(cartForParty)); // 60.55
  
  // --- Credit Card Validation ---
  function validateCreditCard(card) {
    const cleaned = card.replace(/-/g, '');
    if (!/^\d{16}$/.test(cleaned)) return { valid: false, number: card, error: "wrong_length_or_characters" };
    const digits = cleaned.split('').map(Number);
    if (new Set(digits).size < 2) return { valid: false, number: card, error: "only_one_digit_type" };
    if (digits[15] % 2 !== 0) return { valid: false, number: card, error: "odd_final_digit" };
    const sum = digits.reduce((acc, d) => acc + d, 0);
    if (sum <= 16) return { valid: false, number: card, error: "sum_less_than_16" };
    return { valid: true, number: card };
  }

// === Calculator Tests ===
console.log("=== Calculator Tests ===");
squareNumber(5);       // The result of squaring the number 5 is 25
halfNumber(10);        // Half of 10 is 5
percentOf(5, 10);       // 5 is 50% of 10
areaOfCircle(3);        // Area for a circle with radius 3
allOperations(4);       // Performs all steps

// === MixUp Test ===
console.log("\n=== MixUp Test ===");
console.log(mixUp("dog", "dinner")); // dig donner
console.log(mixUp("mix", "pod"));    // pox mid

// === FixStart Test ===
console.log("\n=== FixStart Test ===");
console.log(fixStart("babble"));     // ba**le

// === Verbing Test ===
console.log("\n=== Verbing Test ===");
console.log(verbing("swim"));        // swimming
console.log(verbing("swimming"));    // swimmingly
console.log(verbing("go"));          // go

// === Not Bad Test ===
console.log("\n=== Not Bad Test ===");
console.log(notBad("This dinner is not that bad!"));   // This dinner is good!
console.log(notBad("This movie is not so bad!"));      // This movie is good!
console.log(notBad("This dinner is bad!"));            // This dinner is bad!

// === Pluralizer Test ===
console.log("\n=== Pluralizer Test ===");
console.log(pluralize("cat", 1));     // 1 cat
console.log(pluralize("cat", 5));     // 5 cats
console.log(pluralize("sheep", 3));   // 3 sheep
console.log(pluralize("goose", 2));   // 2 geese

// === Top Choices Test ===
console.log("\n=== Top Choices ===");
topChoices.forEach((choice, i) => {
  const suffix = (i + 1) === 1 ? 'st' : (i + 1) === 2 ? 'nd' : (i + 1) === 3 ? 'rd' : 'th';
  console.log(`My ${i + 1}${suffix} choice is ${choice}.`);
});

// === Guessing Game Test ===
console.log("\n=== Guessing Game ===");
guessLetter('f');
guessLetter('o');
guessLetter('x');
guessLetter('x'); // Already guessed
guessLetter('z'); // Wrong guess
guessLetter('y'); // Wrong guess

// === Recipe Card Test ===
console.log("\n=== Recipe Card ===");
console.log(recipe.title);
console.log(`Serves: ${recipe.servings}`);
console.log("Ingredients:");
recipe.ingredients.forEach(ing => console.log(ing));

// === Reading List Test ===
console.log("\n=== Reading List ===");
books.forEach(book => {
  const info = `"${book.title}" by ${book.author}`;
  if (book.alreadyRead) {
    console.log(`You already read ${info}`);
  } else {
    console.log(`You still need to read ${info}`);
  }
});

// === Movie Database Test ===
console.log("\n=== Movie Database ===");
printMovie(favoriteMovie);

// === Cash Register Test ===
console.log("\n=== Cash Register ===");
console.log(`Total: $${cashRegister(cartForParty)}`);

// === Credit Card Validator Test ===
console.log("\n=== Credit Card Validator ===");
console.log(validateCreditCard('9999-9999-8888-0000'));
console.log(validateCreditCard('1111-1111-1111-1111'));
console.log(validateCreditCard('6666-6666-6666-6661'));
console.log(validateCreditCard('1234-5678-9012-3456'));
