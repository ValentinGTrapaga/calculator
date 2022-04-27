//Calc functions

function add(num1, num2) {
    return num1 + num2
}

function substract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    if (num2 !== 0) {
        return num1 / num2
    } else {
        return "Syntax Err"
    }
}



// Grab the buttons from the HTML

const operators = document.querySelectorAll('.operator')
const numbers = document.querySelectorAll('.operand')
const equal = document.querySelector('#equal')

const decimal = document.getElementById('decimal')
const clear = document.getElementById('clear')
const previousDisp = document.getElementById('previousDisp')
const currentDisp = document.getElementById('currentDisp')
const keyboard = document.getElementById('keyboard')

let currentNum = ""
let previousNum = ""
let operator = ""
let answer = 0

// Disable the decimal after pressed

function disableDec() {
    decimal.disabled = "true"
}

function enableDec() {
    decimal.disabled = "false"
}

function operate(operator, num1, num2 = 0) {
    console.log("Esta es la cuenta: " + num1 + " " + operator + " " + + num2)
    num1 = Number(num1)
    num2 = Number(num2)

    switch (operator) {
        case '+':
            answer = add(num1, num2)
            break;
        case '-':
            answer = substract(num1, num2)
            break;
        case '*':
            answer = multiply(num1, num2)
            break;
        case '/':
            answer = divide(num1, num2)
            break;
    }
    // Rounded number to 8 significant places
    return (Math.round(answer * 10000) / 10000).toString()
}

function handleOperator(op) {
    operator = op
    previousNum = currentNum
    currentNum = ""
/*     previousDisp.innerText = `${previousNum} ${op}`
    currentNum = ""
    currentDisp.innerText = `${currentNum}` */
    displayResults()
}

function displayResults() {
    previousDisp.innerText = `${previousNum} ${operator} ${currentNum}`
    currentDisp.innerText = `${answer}`
}

function calculate() {
    answer = operate(operator, previousNum, currentNum)
    displayResults()
}

// Ok!
function clearCalculator() {
    previousNum = ""
    currentNum = ""
    answer = 0
    previousDisp.innerText = ""
    currentDisp.innerText = ""
}

//Need to check for two numbers
equal.addEventListener('click', () => {
    if (currentNum != "" && previousNum != "") {
        calculate()
    }
})

// Programming clear key
clear.addEventListener('click', clearCalculator)

// Display the number being typed
numbers.forEach(btn => btn.addEventListener('click', function typeNums() {
    console.log(btn.value)
    if (currentNum.length < 8) {
        currentNum += btn.innerText
    }
    if(btn.value == ".") {
        disableDec()
    }
    enableDec()
    currentDisp.innerText = `${currentNum}`
}
))

// Handle operators when clicked
operators.forEach(op => op.addEventListener('click', e => {
    handleOperator(e.target.textContent)
}))