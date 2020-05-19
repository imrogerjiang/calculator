// TODO
//  - Add keyboard support
//  - Test bugs

function displayShow(str) {
    if(str.indexOf(".") < 0){
        display.textContent = str;
    } else {
        display.textContent = str.substring(0, str.indexOf(".") + 4);
    }
}

function print(str){
    if(str) console.log("----------" + str + "----------");
    console.log("curN:", calc.curN);
    console.log("prevN:", calc.prevN);
    console.log("operator:", calc.operator);
}

function numerical(){
    const n = this.dataset.key;
    
    // add n to the input string
    if(calc.calculated) {
        calc.curN = n;
        calc.calculated = false;
    } else if(calc.curN == "0" || calc.calculated){
        calc.curN = n;
    } else if (calc.curN == "-0"){
        calc.curN = "-" + n;
    } else {    
        calc.curN += n;
    }

    displayShow(calc.curN);
}

function operator(){
    const operator = this.dataset.key;

    // Toggles minus at the start of the number
    if(operator == "-" && !calc.isTyping()){
        calc.curN = 
            (calc.curN == "") ? "-" : "";
        displayShow(calc.curN);
        calc.calculated = false;
        return;
    } else if (calc.prevN == "" && !calc.isTyping()) {
        return;
    }

    if(calc.prevN !== "" && calc.isTyping()){
        compute();
    }
    
    if(calc.operator == null) {
        calc.prevN = calc.curN;
        calc.curN = "";
    }
    calc.operator = operator;
    // print("operator");
}

function compute() {
    if(calc.prevN == "" || !calc.isTyping() || operator == null) return;

    let ans;
    switch(calc.operator){
        case "+":
            ans = Number(calc.prevN) + Number(calc.curN);
            break;
        case "-":
            ans = Number(calc.prevN) - Number(calc.curN);
            break;
        case "*":
            ans = Number(calc.prevN) * Number(calc.curN);
            break;
        case "/":
            if(Number(calc.curN) == 0){
                alert("Well, well, well, looking to test edge cases?\nYou should know I've got them aaaaall covered.");
                return;
            }
            ans = Number(calc.prevN) / Number(calc.curN);
            break;
    }
    calc.prevN = "";
    calc.operator = null;
    calc.curN = String(ans);
    calc.ans = String(ans);
    displayShow(calc.curN);
    display.classList.add("displayHighlight");
    calc.calculated = true;

    // print("compute");
}


function ans(){
    if(calc.curN == ""){
        calc.curN = calc.ans;
        calc.calculated = true;
        displayShow(calc.curN);
    }
}

function dec(){
    if(calc.curN.indexOf(".") > -1) return;

    if(calc.isTyping() && !calc.calculated){
        calc.curN += "."
    } else if (calc.calculated){
        calc.curN = "0."
        calc.calculated = false;
    } else {
        calc.curN += "0."
    }
    displayShow(calc.curN)
}

function del(){
    if(calc.calculated){
        calc.curN = "";
    } else {
        calc.curN = calc.curN.substring(0, calc.curN.length-1);
    }
    displayShow(calc.curN);
}

function clear(){
    calc.curN = "";
    calc.prevN = "";
    calc.operator = null;
    calc.calculated = false;
    displayShow("")
}

function clicked(e){
    if(!this.hasAttribute("data-fnname")) throw "button doesn't have fnName attribute";
    
    const fn = window[this.dataset.fnname];
    if(typeof(fn) !== "function") throw `function ${this.dataset.fnname} does not exist`;

    fn.apply(this);
}

function resetDisplayColor(e){
    display.classList.remove("displayHighlight");
}

function keyToggle(e){
    console.log(e);
    const btn = (e.key == "Backspace") ? 
        document.querySelector(`div[data-key="Delete"]`):
        document.querySelector(`div[data-key="${e.key}"]`);
    
    if(btn == null) {
        return;
    } else if(e.type=="keydown") {
        btn.click();
        btn.classList.add("highlight");
    } else {
        btn.classList.remove("highlight");
    }
}

document.querySelectorAll(".button").forEach(
    e => e.addEventListener("click", clicked)
);

const display = document.getElementById("displayText");
display.addEventListener("transitionend", resetDisplayColor);
document.addEventListener("keydown", keyToggle);
document.addEventListener("keyup", keyToggle);




function isTyping() {
    if(calc.curN == "" || calc.curN == "-") {
        return false;
    } else {
        return true;
    }
}

let calc = {
    curN: "",
    prevN: "",
    ans: null,
    operator: null,
    calculated: false,
    isTyping: isTyping,
}




