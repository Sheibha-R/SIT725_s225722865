function changeText() {
  // List of colour names
  var colorNames = [
    "Red", "Blue", "Green", "Yellow", "Purple",
    "Orange", "Pink", "Brown", "Black", "White",
    "Cyan", "Magenta", "Lime", "Teal", "Indigo"
  ];

  // Pick a random colour name
  var randomIndex = Math.floor(Math.random() * colorNames.length);

  console.log("Random Colour Index:", randomIndex);

  // Change ONLY the text inside the button
  var btn = document.getElementById("changeBtn");
  btn.innerHTML = colorNames[randomIndex];

  // Keep text always black
  btn.style.color = "black";
}