/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button.
 * - Also display the hex code to a disabled input field.
 * - Change the input field background color by generating random hex color by clicking a button.
 * - Add a button to copy the color code.
 * - Add a toast message when copied.
 * - User can type their own hex code too.
 * - Show rgb color too, but do not need to edit it.
 * - User can also copy the rgb color code.
*/

// Globals

let div = null;


// Step 1 - Create onload handler.
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const changeBtn = document.getElementById('change-btn');
  const output = document.getElementById('output');
  const outputRGB = document.getElementById('outputRGB');
  const copyBtn = document.getElementById('copy-btn');
  const copyBtnRGB = document.getElementById('copy-btn-RGB');

  changeBtn.addEventListener('click', function () {
    const color = generateColorDecimal();
    const hex = generateHexColor(color);
    const rgb = generateRGBColor(color);
    root.style.backgroundColor = hex;
    output.style.backgroundColor = hex;
    outputRGB.style.backgroundColor = hex;
    copyBtn.style.backgroundColor = hex;
    copyBtnRGB.style.backgroundColor = hex;
    output.value = hex.substring(1);
    outputRGB.value = rgb;
  })

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(`#${output.value}`);

    if (div !== null) {
      div.remove();
      div = null;
    }

    if (isHexValid(output.value)) {
      generateToastMessage(`#${output.value} copied`);
    } else {
      alert('Invalid Color Code.')
    }
  })


  copyBtnRGB.addEventListener('click', function () {
    navigator.clipboard.writeText(`#${outputRGB.value}`);

    if (div !== null) {
      div.remove();
      div = null;
    }

    if (isHexValid(output.value)) {
      generateToastMessage(`${outputRGB.value} copied`);
    } else {
      alert('Invalid Color Code.')
    }
  })

  output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color) {
      output.value = color.toUpperCase();
      if (isHexValid(color)) {
        root.style.backgroundColor = `#${color}`;
        outputRGB.value = hexToRGB(color);
      }
    }
  })
};


// function 1 - generate three random decimal number for red green and blue
// return as a object
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue
  }

}


// function 2 - generate hex color code.
function generateHexColor({ red, green, blue }) {
  
  // const { red, green, blue } = generateColorDecimal();

  // const twoCodeRed = red <= 9 ? `0${red}` : red.toString(16);
  // const twoCodeGreen = green <= 9 ? `0${green}` : green.toString(16);
  // const twoCodeBlue = blue <= 9 ? `0${blue}` : blue.toString(16);

  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  // return `#${twoCodeRed}${twoCodeGreen}${twoCodeBlue}`.toUpperCase();

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}


// function 3 - generate rgb color code.
function generateRGBColor({ red, green, blue }) {

  // const { red, green, blue } = generateColorDecimal();

  return `rgb(${red}, ${green}, ${blue})`

}


/**
 * Convert hex color to rgb
 * @param {string} hex 
*/
function hexToRGB(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`
}


function generateToastMessage(msg) {
  div = document.createElement('div');
  div.innerText = msg;
  div.className = 'toast-message toast-message-slide-in';

  div.addEventListener('click', function () {
    div.classList.remove('toast-message-slide-in');
    div.classList.add('toast-message-slide-out');

    div.addEventListener('animationend', function () {
      div.remove();
      div = null;
    })

  })

  document.body.appendChild(div);
}

/**
 * @param {string} color 
*/

function isHexValid(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color)
}

// step 2 - Create random color generator function.
//  - Done on generateHexColor function.


// Step 3 - Collect all necessary references.
//  - Done on main function.


// Step 4 - Handle the change button click event.
//  - Done on main function.


// Step 5 - Handle the copy button click event.
//  - Done on main function.


// Step 6 - Activate toast message.


// Step 7 - Create a dynamic toast message.


// Step 8 - Clear toast message.


// Step 9 - Create isHexValid function.


// Step 10 - Implement change handler on input field.


// Step 11 - Prevent copying hex code if it is not valid.


// Step 12 - Refactor the color generator function.


// Step 13 - Update color code to display rgb colors.


// Step 14 - Create hex to rgb function.


// Step 15 - Update change handler.


// Step 16 - Implement copy function.


// Step 17 - Finally Done 8th Project.

