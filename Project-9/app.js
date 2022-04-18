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

  // dom references
  const generateRandomColorBtn = document.getElementById('generate-random-color');
  const colorModeHexInput = document.getElementById('input-hex');
  const colorSliderRed = document.getElementById('color-slider-red');
  const colorSliderGreen = document.getElementById('color-slider-green');
  const colorSliderBlue = document.getElementById('color-slider-blue');

  // event listeners
  generateRandomColorBtn.addEventListener('click', handleGenerateRandomColorBtn);

  colorModeHexInput.addEventListener('keyup', handleColorModeHexInput);

  colorSliderRed.addEventListener('change', handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderGreen.addEventListener('change', handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderBlue.addEventListener('change', handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue));

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
    if (isHexValid(hexColor)) {
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

function isHexValid(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color)
}