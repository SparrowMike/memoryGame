//* Data
let score = 3;

let noteInterval = 1000;
let lightDuration = 500;

const userChoice = [];
const randomized = [];

//* Mode Options
const majorPentatonic = ["red", "orange", "yellow", "turquoise", "blue"];
const majorScale = [
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "purple",
];

//* Functions
const randomizer = () => {
  randomized.forEach((item, index) => {
    setTimeout(() => {
      // console.log(randomized[index]);
      $(`#${item}`).css("background", randomized[index]);
      setTimeout(() => {
        $(`#${item}`).css("background", "");
        $(`#${item}`).css("transition", "background-color 0.5s ease");
      }, lightDuration);
    }, noteInterval * index);
  });
};

const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.length);
    randomized.push(mode[random]);
    console.log(random);
  }
  randomizer();
};

const user = () => {
  $(".playBox").on("click", (e) => {
    console.log("clicked", e.target.id);
    userChoice.push(e.target.id);
    compare(userChoice, randomized);
  });
};

const compare = (arr1, arr2) => {
  if (arr1.length === arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        score = 1;
        $("#score").text(`Current score: ${score}`);
        return score;
      } else {
        score += 1;
        $("#score").text(`Current score: ${score}`);
        return score;
      }
    }
  }
};

//! BUTTONS!
const buttons = () => {
  $("#score").text(`Current score: ${score}`);

  $("#resetOne").on("click", () => {
    score = 1;
    $(".main").toggle();
    $("#gameOne").toggle();
  });

  $("#resetTwo").on("click", () => {
    score = 1;
    $(".main").toggle();
    $("#gameTwo").toggle();
  });

  //* Mode One
  $("#gameOne").toggle();
  $("#modeOne").on("click", () => {
    $("#gameOne").toggle();
    $(".main").toggle();
  });

  //* Mode Two
  $("#gameTwo").toggle();
  $("#modeTwo").on("click", () => {
    $("#gameTwo").toggle();
    $(".main").toggle();
  });
};
$(() => {
  buttons();
  user();
  generator(score, majorPentatonic);
  // gameUp();
  // compare(randomized, userChoice);
  $("#score").text(`Current score: ${score}`);
});

//? ADD ON CLICK TO CHANGE THE MODES INSIDE THE FUNCTION
//? SETTING TO BE ABLE CHANGE THE BLINKING TIME AND NOTE DISTANCE
//? HOW TO LOOP THE GAME!?
