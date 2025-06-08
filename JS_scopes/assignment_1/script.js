
var score=0
//function declaration
function questionOne(){
    let answer=prompt("What is the capital of France?\n(a) Paris\n(b) London\n(c) Berlin\n(d) Madrid")
    if(answer.toLowerCase()=="a"||answer.toLowerCase()=="paris"){
        alert("Correct!")
        score+=1
    }else{
        alert("Incorrect! The correct answer is (a) Paris")
    }
    var localScore=100; //this is a local variable
}

//function expression
const questionTwo = function(){
    let answer=prompt("What is the largest planet in our solar system?\n(a) Earth\n(b) Jupiter\n(c) Saturn\n(d) Mars")
    if(answer.toLowerCase()=="b"||answer.toLowerCase()=="jupiter"){
        alert("Correct!")
        score+=1
    }else{
        alert("Incorrect! The correct answer is (b) Jupiter")
    }
}

const questionThree = ()=>{
    let answer = prompt("Q3: What does HTML stand for?\n(a) Hyper Trainer Marking Language\n(b) HyperText Markup Language\n(c) Hyperlinks and Text Markup Language");
    if(answer.toLowerCase()=="b"||answer.toLowerCase()=="hypertext markup language"){
        alert("Correct!")
        score+=1
    }else{
        alert("Incorrect! The correct answer is (b) HyperText Markup Language")
    }
};

function startQuiz(){
     // Demonstrating hoisting: Using variable before declaration
    console.log("Value of hoistedVar before declaration:", hoistedVar); // undefined
    var hoistedVar = "I am hoisted";

    questionOne()
    questionTwo()
    questionThree()

    document.getElementById("result").innerHTML = "Your score is: " + score + "/3";
}

function reviewScore() {
    console.log(localScore);
    
}