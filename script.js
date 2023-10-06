let display = document.getElementById('display');
let currentEquation = ''; //start off with an empty string


function appendNumber(number){
    currentEquation += number;
    updateDisplay();
}

function appendOperator(operator){
    currentEquation += operator;
    updateDisplay();
}

function clearDisplay(){
    currentEquation = '';
    updateDisplay();
}

function calculateAnswer(){
    try {
        const result = evaluateEquation(currentEquation); // calling the evaluateEquation function
        currentEquation = result.toString();
        updateDisplay();
    } catch(error){
        currentEquation = 'Error';
        updateDisplay();
    }
}

function evaluateEquation(equation){    
    // splits numbers(operands) from the input equation and stores each operand into the operandsArray
    // valid operands are: digits from 0-9
    const operandsArray = equation.match(/\d+/g) || [];

    // splits operators from the input equation and stores each operator into the opperatorsArray
    // valid operators are: +, -, *, /
    const operatorsArray = equation.match(/\+|\-|\*|\//g) || [];

    // two indicies to keep track of. operands and operators

    let result = parseFloat(operandsArray[0]); // the first opperand in the array

    // loops through the entire operatorsArray until there are no more opperators left.
    for (let i = 0; i < operatorsArray.length; i++){
        // i = 0 is the first opperator in the array
    
        switch (operatorsArray[i]){
            // performs the operation depending on the operator
            case '+':
                result += parseFloat(operandsArray[i+1]);
                break;
            case '-':
                result -= parseFloat(operandsArray[i+1]);
                break;
            case '*':
                result *= parseFloat(operandsArray[i+1]);
                break;
            case '/':
                if (operandsArray[i] !== 0) {
                    result /= parseFloat(operandsArray[i+1]);
                } else {
                    throw new Error('Division by zero!');
                }
                break;
            default:
                throw new Error('Invalid operator!');
        }
    }
    return result;

}


function updateDisplay(){
    display.value = currentEquation;
}