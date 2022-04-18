/**
 * Date: 18-04-2022
 * Author: moinsoft
 * Description: Color picker application with huge dom functionalities.
 */

// Globals

let toastContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238
}

const defaultPresetColors = [
  '#93A048',
  '#A2D7BC',
  '#E6A699',
  '#50DC44',
  '#976031',
  '#4CEAAD',
  '#688A5D',
  '#BB7DB3',
  '#3E08B5',
  '#438031',
  '#AE30D7',
  '#6CA8B8',
  '#7F4A75',
  '#D93E52',
  '#189CBF',
  '#A49761',
  '#C8EE8F',
  '#331A7C',
  '#27A5E0',
  '#A9929D',
  '#BE2AAF',
  '#B49601',
  '#2C7A07',
  '#83F493',
  '#CFC941',
  '#F309DA',
  '#423F3A',
  '#3DD5EA',
  '#FAD6BF',
  '#DD6F1A',
  '#561499',
  '#BE10B5',
  '#184CF9',
  '#43A526',
  '#9395DC',
  '#7A28FB'
]


// onload handler.
window.onload = () => {
  main();
  updateColorCodeToDom(defaultColor);
};

// Main or boot function, this function will take care of getting all the DOM references.
function main() {

  // dom references
  const generateRandomColorBtn = document.getElementById('generate-random-color');
  const colorModeHexInput = document.getElementById('input-hex');
  const colorSliderRed = document.getElementById('color-slider-red');
  const colorSliderGreen = document.getElementById('color-slider-green');
  const colorSliderBlue = document.getElementById('color-slider-blue');
  const copyToClipboardBtn = document.getElementById('copy-to-clipboard');

  // event listeners
  generateRandomColorBtn.addEventListener('click', handleGenerateRandomColorBtn);

  colorModeHexInput.addEventListener('keyup', handleColorModeHexInput);
  
  colorSliderRed.addEventListener('change', handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderGreen.addEventListener('change', handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderBlue.addEventListener('change', handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
  
  copyToClipboardBtn.addEventListener('click', handleCopyToClipboard);
  
};



// event handlers
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}

function handleColorModeHexInput(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    }
  }
}


function handleColorSliders (colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value)
    };
    updateColorCodeToDom(color);
  }
}


function handleCopyToClipboard() {
  const colorModeRadios = document.getElementsByName('color-mode');
  const mode = getCheckedValueFromRadios(colorModeRadios);

  if (mode === null) {
    throw new Error('Invalid Radio Input.');
  }


  if (toastContainer !== null) {
    toastContainer.remove();
    toastContainer = null;
  }


  
  if (mode === 'hex') {
    const hexColor = document.getElementById('input-hex').value;

    if (hexColor && isValidHex(hexColor)) {

      navigator.clipboard.writeText(`#${hexColor}`);

      generateToastMessage(`#${hexColor} copied`)

    } else {
      alert('Invalid Hex Code.')
    }

  } else {
    const rgbColor = document.getElementById('input-rgb').value;
    
    if (rgbColor) {

      navigator.clipboard.writeText(rgbColor);

      generateToastMessage(`${rgbColor} copied`)

    } else {
      alert('Invalid RGB Color.')
    }
  }
  
}


// DOM functions

/**
 * Generate a dynamic DOM element to show a toast message.
 * @param {string} msg 
 */
function generateToastMessage(msg) {
  toastContainer = document.createElement('div');
  toastContainer.innerText = msg;
  toastContainer.className = 'toast-message toast-message-slide-in';

  toastContainer.addEventListener('click', function () {
    toastContainer.classList.remove('toast-message-slide-in');
    toastContainer.classList.add('toast-message-slide-out');

    toastContainer.addEventListener('animationend', function () {
      toastContainer.remove();
      toastContainer = null;
    })

  })

  document.body.appendChild(toastContainer);
}


/**
 * Update dom elements with calculated color values.
 * @param {object} color 
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById('color-display').style.backgroundColor = `#${hexColor}`;
  document.getElementById('input-hex').value = hexColor;
  document.getElementById('input-rgb').value = rgbColor;
  document.getElementById('color-slider-red').value = color.red;
  document.getElementById('color-slider-red-label').innerText = color.red;
  document.getElementById('color-slider-green').value = color.green;
  document.getElementById('color-slider-green-label').innerText = color.green;
  document.getElementById('color-slider-blue').value = color.blue;
  document.getElementById('color-slider-blue-label').innerText = color.blue;
}


/**
 * Find the checked elements from a list of radio buttons.
 * @param {Array} nodes 
 * @returns {string / null}
 */
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
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

  return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
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
function hexToDecimalColors(hex) {
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

function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color)
}