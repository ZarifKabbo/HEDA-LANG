let runBtn = document.getElementById('run');
let textArea = document.getElementById('input');
let result = document.getElementById('result');

const allTheCase = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', ':', ';', '{', '}', '<', '>', '.', '.', '"', "'", '?', '/', "\\", '|', 'Fuck', 'Madarchod', 'Behenchod', 'Khanki', 'Magi', 'Sex', 'Love', 'Choda', 'Dhon', ' ']; 

console.log(allTheCase);

let cell = new Array(100).fill(0);
let pointer = 0;
let errors = [];
let outputCodes = [];
const syntax = ['h','e', 'd', 'a'];

runBtn.addEventListener('click', () => {
    errors = [];
    let code = textArea.value;
    let codeArray = code.split('');
    
    // Check for syntax errors
    for(let i = 0; i < codeArray.length; i++) {
        if(syntax.includes(codeArray[i])) {
            continue;
        } else if(syntax.includes(codeArray[i].toLowerCase())) {
            result.innerHTML = `<p id="error"><span class="errorName">ReferenceError:</span> The ${i+1} no. character is '${codeArray[i]}', which should be in lowercase.</p>`;
            errors.push('ReferenceError');
            break;
        } else {
            result.innerHTML = `<p id="error"><span class="errorName">SyntaxError:</span> The ${i+1} no. character is '${codeArray[i]}', which is not a valid command.</p>`;
            errors.push('SyntaxError');
            break;
        }
    }

    if(errors.length == 0) {
        interpretCode(codeArray);
    }
});

function interpretCode(code) {
    cell = new Array(100).fill(0);  // Ensure the cell array is reset
    pointer = 0;  // Reset pointer

    for(let i = 0; i < code.length; i++) {
        if(errors.length == 0) {
            if(code[i] == 'h') {
                cell[pointer]++;
            } else if(code[i] == 'e') {
                cell[pointer]--;
            } else if(code[i] == 'd') {
                pointer++;
            } else if(code[i] == 'a') {
                pointer--;
            } else {
                result.innerHTML = `<p id="error"><span class="errorName">UnexpectedError:</span> Something is wrong, I don't know what is maybe you broke my code.</p>`;
                errors.push('UnexpectedError');
                break;
            }

            // Ensure cell values stay within 0-100
            if(cell[pointer] > 100) {
                cell[pointer] -= 100;
            } else if(cell[pointer] < 0) {
                cell[pointer] += 100;
            }

            // Ensure pointer stays within bounds
            if(pointer >= cell.length) {
                pointer -= cell.length;
            } else if(pointer < 0) {
                pointer += cell.length;
            }
        }
    }

    if(errors.length == 0) {
        getCode();
    }
}

function getCode() {
    result.innerHTML = '';
    outputCodes = [];

    for(let i = 0; i < cell.length; i++) {  // Use '<' instead of '<=' to avoid out-of-bounds access
        let value = cell[i];
        let letter = allTheCase[value];
        outputCodes.push(letter);
    }

    outputCodes = outputCodes.join('');  // Join the array into a string once after the loop
    result.innerHTML = outputCodes;  // Display the final string result
}
