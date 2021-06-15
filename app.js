//* Data
let score = 1;

let lightDuration = 650;
let noteInterval = 1000;

const userChoice = [];
const randomized = [];

//* Mode Options
// const majorScale = {
//   colours: [
//     "red",
//     "orange",
//     "yellow",
//     "green",
//     "turquoise",
//     "blue",
//     "purple",
//   ],
// };
const majorPentatonic = {
  colours: ["red", "orange", "yellow", "turquoise", "blue"],
  // notes: ["src =" /Sounds/RedC-4.mp3"", ]
};

//! Functions
//*==========GENERATES RANDOM PATTERN BASED ON CURRENT SCORE AND THE MODE SENDS IT OVER TO NEW ARRAY
const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.length);
    randomized.push(mode[random]);
  }
  randomizer();
};

//*==========DISPLAYS THE COLOURS ON THE SCREEN BASED ON GENERATOR ARRAY [randomized]
const randomizer = () => {
  randomized.forEach((item, index) => {
    setTimeout(() => {
      console.log(randomized[index]);
      $(`#${item}`).css("background", randomized[index]);
      setTimeout(() => {
        $(`#${item}`).css("background", "");
        $(`#${item}`).css("transition", "background-color 0.5s ease");
      }, lightDuration);
    }, noteInterval * index);
  });
};

//*==========TAKES USER INPUT AND STORES ITg IN NEW ARRAY [userChoice]
const user = () => {
  $(".playBox").on("click", (e) => {
    userChoice.push(e.target.id);
    console.log("clicked", e.target.id);
    compare(userChoice, randomized);
  });
};

//*==========COMPARES ARRAYS OF USER AND THE COMPUTER [randomized] [userChoice]
const compare = (arr1, arr2) => {
  if (arr1.length === arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        reset();
        return;
      } else {
        nextLevel();
        return;
      }
    }
  }
};

const reset = () => {
  score = 1;
  $("#score").text(`Current score: ${score}`);
  alert("Wrong patter, going back to level 1");
  userChoice.splice(0, userChoice.length);
  randomized.splice(0, randomized.length);
  generator(score, majorPentatonic.colours);
  console.log(userChoice);
  console.log(randomized);
  return;
};

const nextLevel = () => {
  score += 1;
  $("#score").text(`Current score: ${score}`);
  userChoice.splice(0, userChoice.length);
  randomized.splice(0, randomized.length);
  generator(score, majorPentatonic.colours);
  console.log(userChoice);
  console.log(randomized);
  return;
};

//! BUTTONS!
const buttons = () => {
  $("#score").text(`Current score: ${score}`);

  $(".next").on("click", () => {
    // generator(score, majorPentatonic.colours);
  });

  //? Mode One
  $("#gameOne").toggle();
  $("#modeOne").on("click", () => {
    $("#gameOne").toggle();
    $(".main").toggle();
    // generator(score, majorPentatonic.colours);
  });

  $("#resetOne").on("click", () => {
    $(".main").toggle();
    $("#gameOne").toggle();
    score = 1;
    $("#score").text(`Current score: ${score}`);
  });

  //? Mode Two
  // $("#gameTwo").toggle();
  // $("#modeTwo").on("click", () => {
  //   $("#gameTwo").toggle();
  //   $(".main").toggle();
  // });

  // $("#resetTwo").on("click", () => {
  //   $(".main").toggle();
  //   $("#gameTwo").toggle();
  //   score = 1;
  // });

  //? Settings
  $("#settings").toggle();
  $("#set").on("click", () => {
    $("#settings").toggle();
    $(".main").toggle();
  });
  $("#back").on("click", () => {
    $("#settings").toggle();
    $(".main").toggle();
  });
};

$("#score").text(`Current score: ${score}`);

//*===================MAIN========================
const main = () => {
  // buttons();
  generator(score, majorPentatonic.colours); // calls randomizer - blinks the lights
  user(); // calls the compare functions compares calls either reset or next level based on the outcome
};
$(main);
