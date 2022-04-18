/**
 * Date: 18-04-2022
 * Author: moinsoft
 * Description: Color picker application with huge dom functionalities.
 */

// Globals

let div = null;


// onload handler.
window.onload = () => {
  main();
};

// Main or boot function, this function will take care of getting all the DOM references.
function main() {

  const generateRandomColorBtn = document.getElementById('generate-random-color');

  // const root = document.getElementById('root');
  // const changeBtn = document.getElementById('change-btn');
  // const output = document.getElementById('output');
  // const outputRGB = document.getElementById('outputRGB');
  // const copyBtn = document.getElementById('copy-btn');
  // const copyBtnRGB = document.getElementById('copy-btn-RGB');

  generateRandomColorBtn.addEventListener('click', handleGenerateRandomColorBtn);

  // copyBtn.addEventListener('click', function () {
  //   navigator.clipboard.writeText(`#${output.value}`);

  //   if (div !== null) {
  //     div.remove();
  //     div = null;
  //   }

  //   if (isHexValid(output.value)) {
  //     generateToastMessage(`#${output.value} copied`);
  //   } else {
  //     alert('Invalid Color Code.')
  //   }
  // })


  // copyBtnRGB.addEventListener('click', function () {
  //   navigator.clipboard.writeText(`#${outputRGB.value}`);

  //   if (div !== null) {
  //     div.remove();
  //     div = null;
  //   }

  //   if (isHexValid(output.value)) {
  //     generateToastMessage(`${outputRGB.value} copied`);
  //   } else {
  //     alert('Invalid Color Code.')
  //   }
  // })

  // output.addEventListener('keyup', function (e) {
  //   const color = e.target.value;
  //   if (color) {
  //     output.value = color.toUpperCase();
  //     if (isHexValid(color)) {
  //       root.style.backgroundColor = `#${color}`;
  //       outputRGB.value = hexToRGB(color);
  //     }
  //   }
  // })
};



// event handlers
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}


// DOM functions
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
 * Update dom elements with calculated color values.
 * @param {object} color 
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById('color-display').style.backgroundColor = hexColor;
  document.getElementById('color-mode-hex').value = hexColor;
  document.getElementById('color-mode-rgb').value = rgbColor;
  document.getElementById('color-slider-red').value = color.red;
  document.getElementById('color-slider-red-label').innerText = color.red;
  document.getElementById('color-slider-green').value = color.green;
  document.getElementById('color-slider-green-label').innerText = color.green;
  document.getElementById('color-slider-blue').value = color.blue;
  document.getElementById('color-slider-blue-label').innerText = color.blue;
}


// Utils


/**
 * generate and return an object of three color decimal values
 * @returns {object}
 */
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



/**
 * take a color object of three decimal values and return a hexadecimal color code.
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {

  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}



/**
 * take a color object of three decimal values and return a rgb color code.
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {

  return `rgb(${red}, ${green}, ${blue})`

}


/**
 * Convert hex color to decimal colors object.
 * @param {string} hex 
 * @returns {object}
 */
function hexToDecimalColor(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue
  }
}




/**
 * validate hex color code.
 * @param {string} color 
 * @returns {boolean}
 */

function isHexValid(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color)
}