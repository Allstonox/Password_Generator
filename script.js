const characterLength = document.querySelector('#character-length');
const slider = document.querySelector('.slider');
let characterLengthValue = 20;

function updateCharacterLength() {
    characterLengthValue = slider.value;
    characterLength.innerHTML = slider.value;
}

const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');

let uppercaseValue = false;
let lowercaseValue = false;
let numbersValue = false;
let symbolsValue = false;

const symbolsList = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
const lettersList = "abcdefghijklmnopqrstuvwxyz";
const numbersList = "0123456789";

let newPassword;

const passwordOutput = document.querySelector('.password-output');

const clipBoard = document.querySelector('.clipboard-icon');

const barOne = document.querySelector('#bar-1');
const barTwo = document.querySelector('#bar-2');
const barThree = document.querySelector('#bar-3');
const barFour = document.querySelector('#bar-4');

function updateCheckboxValues() {
    uppercaseValue = uppercase.checked;
    lowercaseValue = lowercase.checked;
    numbersValue = numbers.checked;
    symbolsValue = symbols.checked;
}

function generatePassword() {
    let newPasswordArray = [];
    let completeList = [];
    if (lowercaseValue || uppercaseValue) {
        completeList.push(...lettersList.split(''));
    }
    if (numbersValue) {
        completeList.push(...numbersList.split(''));
    }
    if (symbolsValue) {
        completeList.push(...symbolsList.split(''));
    }
    for (let i = 0; i < characterLengthValue; i++) {
        let chosenCharacter = completeList[Math.floor(Math.random() * completeList.length)];
        if (isNaN(chosenCharacter * 1)) {
            let isSpecialCharacter = false;
            for (let j = 0; j < symbolsList.length; j++) {
                if (chosenCharacter === symbolsList[j]) {
                    isSpecialCharacter = true;
                }
            }
            if (!isSpecialCharacter && uppercaseValue && lowercaseValue) {
                let caseValue = Math.random();
                if (caseValue > 0.5) {
                    chosenCharacter = chosenCharacter.toUpperCase();
                }
            }
            else if (!isSpecialCharacter && uppercaseValue && !lowercaseValue) {
                chosenCharacter = chosenCharacter.toUpperCase();
            }
        }
        newPasswordArray.push(chosenCharacter);
    }
    newPassword = newPasswordArray.join('');
    displayPassword();
    updateStrength();
}

function displayPassword() {
    passwordOutput.innerText = newPassword;
}

function copyPassword() {
    navigator.clipboard.writeText(newPassword);
    console.log('text copied');
}

function updateStrength() {
    let score = 0;
    let computedScore = 0;
    score += newPassword.length;
    if(uppercaseValue) score += 10;
    if(lowercaseValue) score += 10;
    if(numbersValue) score += 10;
    if(symbolsValue) score += 10;
    computedScore = (score / 80);
    if(computedScore > 0.1) barOne.classList.add('on');
    else barOne.classList.remove('on');
    if(computedScore > 0.50) barTwo.classList.add('on');
    else barTwo.classList.remove('on');
    if(computedScore > 0.75) barThree.classList.add('on');
    else barThree.classList.remove('on');
    if(computedScore > 0.95) barFour.classList.add('on');
    else barFour.classList.remove('on');
    console.log(computedScore);
}
