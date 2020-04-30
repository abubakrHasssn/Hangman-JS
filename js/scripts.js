let letters = "abcdefghijklmnopqrstuvwxyz",
  lettersArray = Array.from(letters),
  lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(letter));
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "inception",
    "inerstaller",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  countries: ["Syria", "Palestaine", "Yamen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words),
  randomPropNumber = Math.floor(Math.random() * allKeys.length),
  randomPropName = allKeys[randomPropNumber],
  randomPropValue = words[randomPropName],
  randomValueNumber = Math.floor(Math.random() * randomPropValue.length),
  randomValueValue = randomPropValue[randomValueNumber];
document.querySelector(".game-info .category span").innerHTML = randomPropName;
let letterGuessContainer = document.querySelector(".letters-guess"),
  lettersAndSpaces = Array.from(randomValueValue);
lettersAndSpaces.forEach((letter) => {
  let span = document.createElement("span");
  if (letter == " ") {
    span.className = "with-space";
  }

  letterGuessContainer.appendChild(span);
});
let wrongAttempts = 0,
  theDraw = document.querySelector(".hangman-draw"),
  spanArray = Array.from(document.querySelector(".letters-guess").children),
  correct = 0;

document.addEventListener("click", (e) => {
  let status = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let clickedletter = e.target.innerHTML.toLowerCase();
    lettersAndSpaces.forEach((letter, index) => {
      if (letter.toLowerCase() == clickedletter) {
        spanArray[index].innerHTML = clickedletter;
        status = true;
        correct++;
      }
    });
    if (correct == randomValueValue.length) {
      endGame("Congratulations You Wen the Word Is");
    }
    if (!status) {
      wrongAttempts += 1;
      theDraw.classList.add(`attempt${wrongAttempts}`);
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        lettersContainer.classList.add("finished");
        endGame("GameOver - The Word Is");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

function endGame(msg) {
  let div = document.createElement("div"),
    button = document.createElement("div");
  button.appendChild(document.createTextNode("Restart"));
  button.className = "btn";
  div.appendChild(document.createTextNode(`${msg} ${randomValueValue}`));
  div.appendChild(button);
  button.onclick = function () {
    location.reload();
    return false;
  };
  div.className = "popup";
  document.body.appendChild(div);
}