function createStudent(usn, subjectCode, subjectName, cieMarks, seeMarks) {
    // CIE and SEE marks are private inside the closure
    let cie = cieMarks;
    let see = seeMarks;

    // Return public methods
    return {
        getTotalMarks: function () {
            return cie + see;
        },
        displayDetails: function () {
            console.log("Student Details:");
            console.log("USN: " + usn);
            console.log("Subject Code: " + subjectCode);
            console.log("Subject Name: " + subjectName);
            console.log("Total Marks: " + this.getTotalMarks());
        }
    };
}

// Example usage
const student1 = createStudent("1RV21CS001", "CS101", "Data Structures", 40, 50);
student1.displayDetails(); // Displays all details with total

// Accessing cie/see directly won't work (they are private)
console.log(student1.cie); // undefined
console.log(student1.see); // undefined
