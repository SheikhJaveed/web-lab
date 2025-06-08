function monthConverter(){
    const months=['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    return function(num){
        num=Math.floor(Number(num));
        if(!Number.isInteger(num) || num<1 || num>12){
            return "Bad Number";
        }
        return months[num-1];
    }
}

const getMonth = monthConverter();
console.log(getMonth(1));  // January
console.log(getMonth("4.6")); // December
