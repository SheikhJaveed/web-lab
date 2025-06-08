function vowelCount(str){
    const vowels="aeiou";
    const result={a:0, e:0, i:0, o:0, u:0};

    str=str.toLowerCase();

    for(let i=0; i<str.length; i++){
        let char=str[i];
        if(vowels.includes(char)){
            result[char]++;
        }
    }

    for(let v in result){
        console.log(`${v}: ${result[v]}`);
    }
}

vowelCount("Le Tour de France");