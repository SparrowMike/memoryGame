//! MODE SELECT BUTTONS
const modeSelectButtons = () => {
  const $main = $("<div>").addClass("main");
  $("body").append($main);

  const $gameContainer = $("<div>").addClass("gameContainer");
  $("body").append($gameContainer);

  const $modeOne = $("<button>").addClass("button bOne").text("Mode One");
  $(".main").append($modeOne);

  // const $modeTwo = $("<button>").addClass("button bTwo").text("Mode Two");
  // $(".main").append($modeTwo);

  const $reset = $("<button>").addClass("button reset").text("Reset");
  $(".main").append($reset);

  //  someday...
  // const $settings = $("<button>").addClass("button reset").text("Settings");
  // $(".main").append($settings);

  const $h2 = $("<h2>").text(`Your current score is ${$level}`);
  $(".main").append($h2);

  $(".gameContainer").hide();

  $(".bOne").on("click", () => {
    $(".gameContainer").show();
    $(".bTwo").hide();
  });

  $(".bTwo").on("click", () => {
    $(".gameContainer").show();
    $(".bOne").hide();
  });

  $(".reset").on("click", () => {
    $(".gameContainer").hide();
    $(".bTwo").show();
    $(".bOne").show();
  });
  return;
};

let $level = 0;
// let randomPattern = [];
const userChoice = [];
// let computer = true;
// let user = false;

let modeOne = ["red", "yellow", "orange", "green", "purple", "blue"];

//! FUNCTIONS
const gameMode = (type) => {
  for (let i = 0; i < type; i++) {
    const playBox = $("<div>").addClass(`playBox ${[i]}`);
    $(".gameContainer").append(playBox);
  }
};

const randomizer = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
let randomPattern = randomizer(modeOne);
console.log("randomPattern", randomPattern);

// const randomizer = () => {
//   let randomNumber = Math.floor(Math.random() * 4);
//   randomPattern.push(modeOne[randomNumber]);
//   $level += 1;
//   return randomNumber;
// };

const displayRandomiseResult = () => {
  randomizer();
  // $(`.${randomNumber}`).css("background-color", modeOne[randomNumber]);
  // color change
  // result
};

const userInput = () => {
  userInputKey = [];
  $("playBox").on("click");
  //compare userInputKey === randomPattern
};

//! MAIN
// $(() => {
modeSelectButtons();
gameMode(6);
userInput();
// randomizer();
// });
