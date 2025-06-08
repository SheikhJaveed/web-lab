function translate(text){
    return text.replace(/([bcdfghjklmnopqrstuvwxyz])/gi,'$1o$1');
}

console.log(translate("this is fun"));