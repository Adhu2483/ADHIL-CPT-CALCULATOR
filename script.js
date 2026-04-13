//Youtube calculator tutorial was used for a base logic on the calculator.

var calcHistory = []; 

function press(val) {
    var display = document.getElementById("display");
    
    
    var operators = ["+", "-", "−", "*", "×", "/", "÷", ".", "(", ")"];

    if (display.value === "Error" || display.value === "Undefined") {
        display.value = val;
        return;
    }

    if (display.value === "0") {
        
        if (operators.includes(val)) {
            display.value = "0" + val;
        } else {
           
            display.value = val;
        }
    } else {
        display.value += val;
    }
}

function clearDisplay() {
    document.getElementById("display").value = "0";
}

function filterHistory(query) {
    var box = document.getElementById("historyBox");
    box.innerHTML = ""; 

    for (var i = 0; i < calcHistory.length; i++) {
        if (calcHistory[i].includes(query)) {
            var div = document.createElement("div");
            div.textContent = calcHistory[i];
            div.style.padding = "8px";
            div.style.borderBottom = "1px solid #eee";
            box.appendChild(div);
        }
    }
}

function calculate() {
    var display = document.getElementById("display");
    var currentInput = display.value;

    try {
        var mathString = currentInput.replace(/×/g, "*") //Gemini helped me replace sybols to javascript operators.
                                     .replace(/÷/g, "/")
                                     .replace(/−/g, "-");
        
        if (mathString.includes("/0")) {
            display.value = "Undefined";
            return; 
        }

        var result = eval(mathString);

        

        var entry = currentInput + " = " + result;
        calcHistory.push(entry);

        display.value = result;
        filterHistory(""); 
        
    } catch (err) {
        display.value = "Error";
    }
}

function square() { // this function squares the two vlaues whenever the square button is clicked.
    var display = document.getElementById("display");
    try {
        var val = eval(display.value.replace(/−/g, "-"));
        var result = val * val;
        
        var entry = display.value + "² = " + result;
        calcHistory.push(entry);
        
        display.value = result;
        filterHistory(""); 
    } catch (err) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) { //Whenever enter is pressed, it does the same function as pressing "="
    if (event.key === "Enter") {
        event.preventDefault(); 
        calculate();
    }
});
