// Use a unique namespace to avoid browser conflicts
var myCalc = {
    currentInput: "",
    history: []
};

function press(val) {
    myCalc.currentInput += val;
    updateDisplay();
}

function updateDisplay() {
    const displayElement = document.getElementById("display");
    if (displayElement) {
        displayElement.value = myCalc.currentInput || "0";
    }
}

function clearDisplay() {
    myCalc.currentInput = ""; // Changed to All Clear for testing
    updateDisplay();
}

function calculate() {
    if (!myCalc.currentInput) return;

    try {
        // 1. Clean the input (replaces 'smart' characters from mobile/copy-paste)
        let mathString = myCalc.currentInput
            .replace(/−/g, "-")
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        // 2. Evaluate
        var result = eval(mathString);

        // 3. Update History
        addToHistory(myCalc.currentInput, result);

        // 4. Update UI
        myCalc.currentInput = result.toString();
        updateDisplay();

    } catch (err) {
        // THIS WILL TELL YOU THE TRUTH:
        console.error("CRITICAL ERROR:", err.message);
        console.log("Input attempted:", myCalc.currentInput);
        
        document.getElementById("display").value = "Error";
        myCalc.currentInput = "";
    }
}

function square() {
    try {
        let val = eval(myCalc.currentInput.replace(/−/g, "-"));
        let result = val * val;
        addToHistory(myCalc.currentInput + "²", result);
        myCalc.currentInput = result.toString();
        updateDisplay();
    } catch (err) {
        console.error("Square Error:", err.message);
        document.getElementById("display").value = "Error";
    }
}

function addToHistory(expression, result) {
    const box = document.getElementById("historyBox");
    if (!box) {
        console.warn("History element 'historyBox' not found in HTML!");
        return;
    }

    const entry = expression + " = " + result;
    myCalc.history.push(entry);

    const div = document.createElement("div");
    div.textContent = entry;
    div.style.borderBottom = "1px solid #444";
    div.style.padding = "5px";
    
    // Add to the top of the history list
    box.insertBefore(div, box.firstChild);
}