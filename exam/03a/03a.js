function priceCalculator(taxRate){
    return function(price){
        return price + (price*taxRate);
    }
}

const addTax = priceCalculator(0.18);
console.log(addTax(100)); // 118
