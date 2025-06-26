function notBad(str) {
  const notIndex = str.indexOf("not");
  const badIndex = str.indexOf("bad");

  if (notIndex !== -1 && badIndex !== -1 && badIndex > notIndex) {
    // Replace from 'not' to 'bad' (inclusive) with 'good'
    return str.slice(0, notIndex) + "good" + str.slice(badIndex + 3);
  }
  
  return str;
}

console.log(notBad("This dinner is not that bad!")); 
// Output: "This dinner is good!"

console.log(notBad("This dinner is bad!"));          
// Output: "This dinner is bad!"

console.log(notBad("The movie was not bad at all.")); 
// Output: "The movie was good at all."

console.log(notBad("It's not too bad.")); 
// Output: "It's good."

console.log(notBad("Nothing bad happened.")); 
// Output: "Nothing bad happened." (since 'bad' doesn't follow 'not')
