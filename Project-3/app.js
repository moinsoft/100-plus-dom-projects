/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button.
 * - Also display the hex code to a disabled input field.
 * - Change the input field background color by generating random hex color by clicking a button.
 * - Add a button to copy the color code.
*/


// Step 1 - Create onload handler.
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const changeBtn = document.getElementById('change-btn');
  const output = document.getElementById('output');
  const copyBtn = document.getElementById('copy-btn');

  changeBtn.addEventListener('click', function () {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.style.backgroundColor = bgColor;
    copyBtn.style.backgroundColor = bgColor;
    output.value = bgColor;
  })

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(output.value);
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


// Step 3 - Collect all necessary references.
//  - Done on main function


// Step 4 - Handle the change button click event.
//  - Done on main function


// Step 5 - Handle the copy button click event.
//  - Done on main function

// Step 6 - Finally Done 3rd Project