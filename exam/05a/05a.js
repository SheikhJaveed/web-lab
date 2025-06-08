function pluralize(noun,number){
    const irregular = {sheep:"sheep",goose:"geese"};
    let plural=noun;

    if(number!==1){
        plural=irregular[noun] || noun + 's';
    }

    return `${number} ${plural}`;
}

console.log(pluralize("cat", 5)); // 1 cat
console.log(pluralize("sheep", 2)); // 2 dogs
