function monthConverter() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    return function(num) {
        num = Math.floor(Number(num)); // Strip decimal and convert string to number
        if (isNaN(num) || num < 1 || num > 12) {
            return "Bad Number";
        }
        return months[num - 1];
    };
}

const getMonth = monthConverter();

// Test cases
console.log(getMonth(1));        // January
console.log(getMonth("4.6"));    // April ✅
console.log(getMonth("12.9"));   // December ✅
console.log(getMonth(0));        // Bad Number
console.log(getMonth("abc"));    // Bad Number
console.log(getMonth(13));       // Bad Number
