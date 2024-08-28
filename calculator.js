document.addEventListener('DOMContentLoaded', function () {
    const calculatorScreen = document.getElementById('screen');
    let currentInput = '';

    const updateScreen = (value) => {
        const displayValue = value.replace(/\*/g, '×').replace(/\//g, '÷').replace(/Math.sqrt\(/g, '√(').replace(/Math.log10\(/g, 'log10(');
        calculatorScreen.value = displayValue;
    };

    const clearScreen = () => {
        currentInput = '';
        updateScreen('0');
    };

    const deleteLast = () => {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput || '0');
    };

    const inputDigit = (digit) => {
        currentInput += digit;
        updateScreen(currentInput);
    };

    const inputOperator = (op) => {
        if (op === 'sin' || op === 'cos' || op === 'tan') {
            currentInput += `${op}(`;
        } else if (op === 'sqrt') {
            currentInput += `√(`;
        } else if (op === '^') {
            currentInput += `^`;
        } else if (op === 'log') {
            currentInput += `Math.log10(`; 
        } else {
            currentInput += op;
        }
        updateScreen(currentInput);
    };

    const inputParenthesis = (parenthesis) => {
        currentInput += parenthesis;
        updateScreen(currentInput);
    };

    const inputDecimal = () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateScreen(currentInput);
        }
    };

    const toggleSign = () => {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateScreen(currentInput);
        }
    };

    const calculate = () => {
        try {
            let result = currentInput;
            result = result.replace(/×/g, '*')
                           .replace(/÷/g, '/')
                           .replace(/√\(/g, 'Math.sqrt(')
                           .replace(/sin\(/g, 'Math.sin(')
                           .replace(/cos\(/g, 'Math.cos(')
                           .replace(/tan\(/g, 'Math.tan(')
                           .replace(/\^/g, '**');  
            result = result.replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)')
                           .replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)')
                           .replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)');
    
            currentInput = eval(result).toString();
            updateScreen(currentInput);
        } catch (error) {
            updateScreen('Error');
        }
    };

    document.querySelector('.calculator-keys').addEventListener('click', (event) => {
        const target = event.target;
        const action = target.dataset.action;

        if (target.matches('button')) {
            switch (action) {
                case 'clear':
                    clearScreen();
                    break;
                case 'delete':
                    deleteLast();
                    break;
                case 'operator':
                    inputOperator(target.value);
                    break;
                case 'decimal':
                    inputDecimal();
                    break;
                case 'toggle-sign':
                    toggleSign();
                    break;
                case 'calculate':
                    calculate();
                    break;
                default:
                    inputDigit(target.value);
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        const { key } = event;

        if (!isNaN(key)) {
            inputDigit(key);
        } else if (key === '+') {
            inputOperator('+');
        } else if (key === '-') {
            inputOperator('-');
        } else if (key === '*') {
            inputOperator('*');
        } else if (key === '/') {
            inputOperator('/');
        } else if (key === '(' || key === ')') {
            inputParenthesis(key);
        } else if (key === '.') {
            inputDecimal();
        } else if (key.toLowerCase() === 's') {
            inputOperator('sin');
        } else if (key.toLowerCase() === 'c') {
            inputOperator('cos');
        } else if (key.toLowerCase() === 't') {
            inputOperator('tan');
        } else if (key.toLowerCase() === 'r') {
            inputOperator('sqrt');
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculate();
        } else if (key === 'Backspace') {
            deleteLast();
        } else if (key === 'Escape') {
            clearScreen();
        } else if (key === 'n' || key === 'N') {
            toggleSign();
        }
          else if (key === '^') {
            inputOperator('^');
        } else if (key.toLowerCase() === 'l') {
            inputOperator('log');
        }
    });

    clearScreen(); 
});
