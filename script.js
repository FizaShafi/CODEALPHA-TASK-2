
const display = document.getElementById("display");
const result = document.getElementById("result");

const buttons = document.querySelectorAll("button");

// Calculate expression safely
function calculate(expression) {
    if (!expression || !/^[0-9+\-*/.()\s]+$/.test(expression)) {
        return null;
    }

    try {
        let answer = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(answer)) {
            return null;
        }

        return answer;
    } catch {
        return null;
    }
}

// Update live result
function updateResult() {
    let answer = calculate(display.value);

    result.textContent =
        answer === null ? "Result: -" : "Result: " + answer;
}

// Button clicks
buttons.forEach(button => {

    button.addEventListener("click", () => {

        let value = button.dataset.value;
        let action = button.dataset.action;

        if (action === "clear") {
            display.value = "";
            result.textContent = "Result: 0";
        }

        else if (action === "delete") {
            display.value = display.value.slice(0, -1);
            updateResult();
        }

        else if (action === "calculate") {
            let answer = calculate(display.value);

            if (answer !== null) {
                display.value = answer;
                result.textContent = "Result: " + answer;
            } else {
                result.textContent = "Invalid Expression";
            }
        }

        else if (value !== undefined) {
            display.value += value;
            updateResult();
        }

    });

});

// Keyboard support
display.addEventListener("input", updateResult);

document.addEventListener("keydown", (event) => {

    if (event.target === display) {
        return;
    }

    if (/^[0-9+\-*/.]$/.test(event.key)) {
        display.value += event.key;
        updateResult();
    }

    else if (event.key === "Enter") {
        event.preventDefault();

        let answer = calculate(display.value);

        if (answer !== null) {
            display.value = answer;
            result.textContent = "Result: " + answer;
        }
    }

    else if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1);
        updateResult();
    }

    else if (event.key === "Escape") {
        display.value = "";
        result.textContent = "Result: 0";
    }

});
