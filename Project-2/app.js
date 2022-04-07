/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button.
 * - Also display the hex code to a disabled input field.
 * - Change the input field background color by generating random hex color by clicking a button.
*/


// Step 1 - Create onload handler.
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const changeBtn = document.getElementById('change-btn');
  const output = document.getElementById('output')

  changeBtn.addEventListener('click', function () {
    const bgColor = generateHexColor();
    root.style.backgroundColor = bgColor;
    output.style.backgroundColor = bgColor;
    output.value = bgColor;
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


// Step 4 - Handle the click event.
//  - Done on main function


// Step 5 - Finally Done 2nd Project