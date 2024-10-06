document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "";
    let currentOperation = null;
    let previousValue = null;

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.dataset.value;

            // If 'C' button is pressed, clear the display and reset values
            if (value === "C") {
                currentInput = "";
                currentOperation = null;
                previousValue = null;
                display.value = "";
            } 
            // If '=' button is pressed, calculate the result
            else if (value === "=") {
                if (currentOperation !== null && previousValue !== null) {
                    currentInput = calculate(previousValue, parseFloat(currentInput), currentOperation);
                    display.value = currentInput;
                    previousValue = null;
                    currentOperation = null;
                }
            } 
            // If an operator is pressed, save the current value and operator
            else if (["+", "-", "*", "/"].includes(value)) {
                if (currentInput !== "") {
                    if (previousValue === null) {
                        previousValue = parseFloat(currentInput);
                    } else {
                        previousValue = calculate(previousValue, parseFloat(currentInput), currentOperation);
                    }
                    currentOperation = value;
                    currentInput = "";
                    display.value = previousValue;
                }
            } 
            // For number or dot button press, add it to current input
            else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    function calculate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return (num1 + num2).toString();
            case "-":
                return (num1 - num2).toString();
            case "*":
                return (num1 * num2).toString();
            case "/":
                return (num2 !== 0) ? (num1 / num2).toString() : "Error";
            default:
                return "0";
        }
    }
});
