let a = 0;
let b = 0;
let result = 0;
let operator = "";

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return (result = num1 + num2);
    case "-":
      return (result = num1 - num2);
    case "*":
      return (result = num1 * num2);
    case "/":
      return (result = num1 / num2);
    default:
      return NaN;
  }
}

const buttons = document.querySelectorAll("button");
const equationDisplay = document.querySelector(".equation");
const inputDisplay = document.querySelector(".input");

function handleInput(input) {
  switch (input) {
    case "AC":
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
        inputDisplay.textContent += input;
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
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
        inputDisplay.textContent = a;
      }
      break;
    case "=":
      if (equationDisplay.textContent.slice(-1) === "=") {
        return;
      } else if (operator === "") {
        a = Number(inputDisplay.textContent);
        equationDisplay.textContent = `${a} =`;
      } else {
        b = Number(inputDisplay.textContent);
        equationDisplay.textContent = `${a} ${operator} ${b} =`;
        a = operate(a, b, operator);
        inputDisplay.textContent = a;
        a = 0;
        b = 0;
        operator = "";
      }
      break;
    default:
      const nums = "1234567890";
      //const ops = "+-*/";

      // checks if the button pressed is a number FIXXXXXXXX
      if (nums.includes(input)) {
        //reset equation & input display after an equals result
        if (equationDisplay.textContent.slice(-1) === "=") {
          equationDisplay.textContent = "";
          inputDisplay.textContent = "0";
        }

        if (inputDisplay.textContent === "0" || result === Number(inputDisplay.textContent)) {
          inputDisplay.textContent = input;
          result = 0;
        } else {
          inputDisplay.textContent += input;
        }
      }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.textContent);
    handleInput(e.target.textContent);
  });
});
