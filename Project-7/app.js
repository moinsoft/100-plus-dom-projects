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
  const output = document.getElementById('outputHex');
  const copyBtn = document.getElementById('copy-btn');

  changeBtn.addEventListener('click', function () {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.style.backgroundColor = bgColor;
    copyBtn.style.backgroundColor = bgColor;
    output.value = bgColor.substring(1);
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

  output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color) {
      output.value = color.toUpperCase();
      if (isHexValid(color)) {
        root.style.backgroundColor = `#${color}`;
      }
    }
  })
};


// step 2 - Create random color generator function.
function generateHexColor() {
  // #000000, #ffffff
  // 255, 255, 255 -> ff, ff, ff
  // 255, 255, 255 -> #ffffff
  
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
}


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