/**
 * Global array to store calculation strings for the history list.
 * Logic based on Youtube JS calculator tutorials.
 */
var calcHistory = [];

// Handles number and operator button clicks
function press(val) {
    var display = document.getElementById("display");
    var operators = ["+", "-", "−", "*", "×", "/", "÷", ".", "(", ")"];

    // Clear the screen if an error message is currently shown
    if (display.value === "Error" || display.value === "Undefined") {
        display.value = val;
        return;
    }

    // Handle initial zero state to prevent leading zeros (e.g., "05")
    // Gemini Assisted in fixing an error in this logic
    if (display.value === "0") {
        if (operators.includes(val)) {
            display.value = "0" + val; // Keep zero if followed by operator
        } else {
            display.value = val;       // Replace zero if followed by number
        }
    } else {
        display.value += val;          // Append value to current string
    }
}

// Resets display to default state
function clearDisplay() {
    document.getElementById("display").value = "0";
}

// Updates the history UI box, optionally filtering by a search query
function filterHistory(query) {
    var box = document.getElementById("historyBox");
    box.innerHTML = ""; // Clear existing UI list

    for (var i = 0; i < calcHistory.length; i++) {
        // Only shows history items that match the search query
        if (calcHistory[i].includes(query)) {
            var div = document.createElement("div");
            div.textContent = calcHistory[i];
            // Styling for history entries
            div.style.padding = "8px";
            div.style.borderBottom = "1px solid #eee";
            box.appendChild(div);
        }
    }
}

// Evaluates the math expression and saves to history
function calculate() {
    var display = document.getElementById("display");
    var currentInput = display.value;

    try {
        // Convert user friendly symbols to JavaScript readable math operators
        // Google Gemini Helped me with the conversion
        var mathString = currentInput.replace(/×/g, "*") 
                                     .replace(/÷/g, "/")
                                     .replace(/−/g, "-");
        
        // Manual check for division by zero
        if (mathString.includes("/0")) {
            display.value = "Undefined";
            return; 
        }

        // Calculate the result using eval()
        var result = eval(mathString);

        // Store entry in history array
        var entry = currentInput + " = " + result;
        calcHistory.push(entry);

        // Update display and refresh history UI
        display.value = result;
        filterHistory(""); 
        
    } catch (err) {
        display.value = "Error"; // Catch syntax errors (ex."5++5")
    }
}

// Squares the current number on the display
function square() { 
    var display = document.getElementById("display");
    try {
        // Clean symbols before calculating
        var val = eval(display.value.replace(/−/g, "-"));
        var result = val * val;
        
        // Add squared result to history
        var entry = display.value + "² = " + result;
        calcHistory.push(entry);
        
        display.value = result;
        filterHistory(""); 
    } catch (err) {
        display.value = "Error";
    }
}

// Allows user to trigger calculation by pressing the 'Enter' key
document.addEventListener("keydown", function(event) { 
    if (event.key === "Enter") {
        event.preventDefault(); // Stop default browser actions
        calculate();
    }
});
