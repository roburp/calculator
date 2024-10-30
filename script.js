let a = 0;
let b = 0;
let result = 0;
let operator = "";
const maxDisplay = 11;

const buttons = document.querySelectorAll("button");
const equationDisplay = document.querySelector(".equation");
const inputDisplay = document.querySelector(".input");

// add event listener to each button and handles the input with the handleInput() function
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleInput(e.target.textContent);
  });
});

// add event listener to keyboard and handles the input with the handleInput() function
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const pressed = e.key.toUpperCase();
  switch (pressed) {
    case "ENTER":
    case " ":
      handleInput("=");
      return;
    case "ESCAPE":
      handleInput("AC");
      return;
    case "BACKSPACE":
    case "DELETE":
      handleInput("C");
      return;
  }

  handleInput(e.key);
});

function handleInput(input) {
  switch (input) {
    case "AC":
      enableButtons();
      a = 0;
      b = 0;
      operator = "";
      equationDisplay.textContent = "";
      inputDisplay.textContent = "0";
      break;
    case "C":
      operator === "" ? (a = 0) : (b = 0);
      inputDisplay.textContent = "0";
      break;
    case "%":
      inputDisplay.textContent = Number(inputDisplay.textContent) / 100;
      break;
    case "+/-":
      inputDisplay.textContent = Number(inputDisplay.textContent) * -1;
      break;
    case ".":
      if (equationDisplay.textContent.slice(-1) === "=") {
        equationDisplay.textContent = "";
        inputDisplay.textContent = "0.";
      } else if (!inputDisplay.textContent.includes(".")) {
        if (inputDisplay.textContent === "0") {
          inputDisplay.textContent = "0.";
        } else {
          inputDisplay.textContent += input;
        }
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      // if there is no operator yet or the equals sign was pressed last, set currently displayed number as a;
      // otherwise, set as b
      if (operator === "" || equationDisplay.textContent.slice(-1) === "=") {
        a = Number(inputDisplay.textContent);
        operator = input;
        equationDisplay.textContent = `${a} ${input}`;
        inputDisplay.textContent = "0";
      } else {
        b = Number(inputDisplay.textContent);
        a = operate(a, b, operator);
        operator = input; // replace previous operator after operate() with new operator
        b = 0;
        equationDisplay.textContent = `${a} ${input}`;
        inputDisplay.textContent = formatResult(a);
      }
      break;
    case "=":
      // if last button pressed was equals, do nothing
      // if there is no operator yet, set currently displayed number as a
      // otherwise, operate()
      if (equationDisplay.textContent.slice(-1) === "=") {
        return;
      } else if (operator === "") {
        a = Number(inputDisplay.textContent);
        equationDisplay.textContent = `${a} =`;
      } else {
        b = Number(inputDisplay.textContent);
        equationDisplay.textContent = `${a} ${operator} ${b} =`;
        a = operate(a, b, operator);
        inputDisplay.textContent = formatResult(a);
        a = 0;
        b = 0;
        operator = "";
      }
      break;
    default:
      const nums = "1234567890";
      //const ops = "+-*/";

      // checks if the button pressed is a number
      if (nums.includes(input)) {
        // reset equation & input display after an equals result then goes to next if-statement
        if (equationDisplay.textContent.slice(-1) === "=") {
          equationDisplay.textContent = "";
          inputDisplay.textContent = "0";
        }

        // only inputs numbers if the display is less than 11
        if (inputDisplay.textContent.length < maxDisplay) {
          if (inputDisplay.textContent === "0.") {
            inputDisplay.textContent += input;
          } else if (inputDisplay.textContent === "0" || result === Number(inputDisplay.textContent)) {
            inputDisplay.textContent = input;
            result = 0;
          } else {
            inputDisplay.textContent += input;
          }
        }
      }
  }
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return (result = num1 + num2);
    case "-":
      return (result = num1 - num2);
    case "*":
      return (result = num1 * num2);
    case "/":
      if (b === 0) {
        disableButtons();
        return (result = "BAD!");
      } else return (result = num1 / num2);
    default:
      return NaN;
  }
}

function formatResult(num) {
  length = num.toString().length;
  // Check if the number is large or small enough for scientific notation
  if (num >= 1e10 || num <= -1e10 || length > 10) {
    return num.toExponential(2); // Format to scientific notation
  } else {
    return num; // Just return the number, no conversion
  }
}

function disableButtons() {
  buttons.forEach((button) => {
    if (button.textContent !== "AC") {
      button.classList.add("disabled");
      button.disabled = true;
    }
  });
}

function enableButtons() {
  buttons.forEach((button) => {
    if (button.textContent !== "AC") {
      button.classList.remove("disabled");
      button.disabled = false;
    }
  });
}
