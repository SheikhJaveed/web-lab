// 1. Global Variables
var studentName = "Rahul";
var activityScores = [20, 35, 15];

// 2. Function Declaration
function calculateTotal(scores) {
    let total = 0;
    for (let score of scores) {
        total += score;
    }
    return total;
}

// 3. Function Expression: evaluateRank
const evaluateRank = function(totalScore) {
    if (totalScore > 40) return "Star Performer";
    else if (totalScore >= 30) return "Active";
    else return "Inactive";
};

// 4. Anonymous Function for average score
const calculateAverage = function(scores) {
    let total = calculateTotal(scores);
    return (total / scores.length).toFixed(2);
};

// 6. Hoisting Experiment
console.log("Hoisting Test - category before declaration:", category); // undefined
var category = "Hoisting Example";

// 7. Scope Isolation Test
if (true) {
    var scopedVar = "Declared inside if block";
}
console.log("Scope Isolation Test - scopedVar:", scopedVar); // Accessible outside block

// 5. Lexical Scope Task
function generateReport(student, rank) {
    let message = "";

    if (rank === "Star Performer") message = "Great job on co-curriculars!";
    else if (rank === "Active") message = "Keep it up!";
    else message = "Get more involved!";

    function showDetails() {
        // Nested function accessing outer scope
        console.log("Report:");
        console.log("  Student:", student);
        console.log("  Rank:", rank);
        console.log("  Message:", message);
    }

    showDetails(); // Call nested function
}


console.log("Student:", studentName);
console.log("Activity Scores:", activityScores);

let total = calculateTotal(activityScores);
console.log("Total Score:", total);

let avg = calculateAverage(activityScores);
console.log("Average Score:", avg);

let rank = evaluateRank(total);
console.log("Rank:", rank);

generateReport(studentName, rank);
