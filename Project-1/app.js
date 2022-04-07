/**
 * Project Requirements:
 * - Change the background color by generating random rgb color by clicking a button.
*/

// Step 1 - Create onload handler.
window.onload = () => {
  main();
};

function main() {
  
};

// step 2 - Create random color generator function.
function generateRGBColor() {
  // rgb(0,0,0), rgb(255,255,255)

  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`
}

// Step 3 - Collect all necessary references.

// Step 4 - Handle the click event.
