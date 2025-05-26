const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expr = display.value;

    // Replace symbols with JS equivalents
    expr = expr.replace(/π/g, "Math.PI");
    expr = expr.replace(/√/g, "Math.sqrt");
    expr = expr.replace(/sin\(([^)]+)\)/g, (_, x) => `Math.sin(${parseFloat(x) * Math.PI / 180})`);
    expr = expr.replace(/cos\(([^)]+)\)/g, (_, x) => `Math.cos(${parseFloat(x) * Math.PI / 180})`);
    expr = expr.replace(/tan\(([^)]+)\)/g, (_, x) => `Math.tan(${parseFloat(x) * Math.PI / 180})`);

    const result = eval(expr);
    if (isNaN(result)) throw new Error("Invalid");
    display.value = parseFloat(result.toFixed(10));
  } catch (error) {
    display.value = 'Error';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      clearDisplay();
    } else if (value === '⌫') {
      backspace();
    } else if (value === '=') {
      calculate();
    } else if (['sin', 'cos', 'tan'].includes(value)) {
      appendToDisplay(value + '(');
    } else if (value === '√') {
      appendToDisplay('√(');
    } else if (value === 'π') {
      appendToDisplay('π');
    } else {
      appendToDisplay(value);
    }
  });
});

document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || "+-*/().".includes(e.key)) {
    appendToDisplay(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    backspace();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
