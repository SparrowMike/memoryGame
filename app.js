let score = 1;

let lightDuration = 650;
let noteInterval = 1000;
let audioSpeed = 1;

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

const pentatonic = ["red", "orange", "yellow", "turquoise", "blue"];

//! Functions
//*========GENERATES RANDOM PATTERN=============
const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.length);
    randomized.push(mode[random]);
  }
  randomizer();
};

//*==========DISPLAYS THE COLOURS===============
const randomizer = () => {
  randomized.forEach((item, index) => {
    setTimeout(() => {
      console.log(randomized[index]);
      $(`#${item}-audio`).get(0).play();
      $(`#${item}`).css("background", randomized[index]);
      setTimeout(() => {
        $(`#${item}`).css("background", "");
        $(`#${item}`).css("transition", "background-color 0.6s ease");
      }, lightDuration);
    }, noteInterval * index);
  });
};

//*==============USER INPUT=======================
const user = () => {
  $(".playBox").on("click", (e) => {
    userChoice.push(e.target.id);
    $(`#${e.target.id}-audio`).get(0).play();
    console.log("clicked", e.target.id);
    compare(userChoice, randomized);
  });
};

//*===========COMPARES ARRAYS======================
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

//*===========RESET THE GAME===================
const reset = () => {
  score = 1;
  userChoice.splice(0, userChoice.length);
  randomized.splice(0, randomized.length);
  $("#popUp").dialog("open");
  return;
};

//*===============LEVEL UP====================
const nextLevel = () => {
  score += 1;
  $("#score").text(`Current score: ${score}`);
  userChoice.splice(0, userChoice.length);
  randomized.splice(0, randomized.length);
  setTimeout(() => {
    generator(score, pentatonic);
  }, 1200);
  return;
};

//! BUTTONS
const buttons = () => {
  //? POP UP'S
  $("#popUp").dialog({ autoOpen: false }, { title: "Game Over!" });
  $("#modes").dialog({ autoOpen: false }, { title: "Modes" });

  //? START THE GAME
  $("#gameOne").toggle();
  $("#modeOne").on("click", () => {
    $("#gameOne").toggle();
    $(".main").toggle();
    setTimeout(() => {
      generator(score, pentatonic);
    }, 100);
  });

  //? RESET THE GAME
  $(".reset").on("click", () => {
    score = 1;
    $(".audio").stop();
    $("#score").text(`Current score: ${score}`);
    userChoice.splice(0, userChoice.length);
    randomized.splice(0, randomized.length);
    $("#popUp").dialog("close");
    generator(score, pentatonic);
  });

  //? SETTINGS
  $(".settingsWindow").dialog({ autoOpen: false }, { title: "Settings" });
  $(".settings").on("click", () => {
    $(".settingsWindow").dialog("open");
    score = 1;
    userChoice.splice(0, userChoice.length);
    randomized.splice(0, randomized.length);
  });
  $("#confirm").on("click", () => {
    $(".settingsWindow").dialog("close");
    lightDuration = $("#lightDuration").val();
    noteInterval = $("#noteInterval").val();
    audioSpeed = $("#audioSpeed").val();
    // console.log(lightDuration);
  });

  //? BACK TO MAIN
  $(".back").on("click", () => {
    $(".main").toggle();
    $("#gameOne").toggle();
    $(".audio").stop();
    score = 1;
    $("#score").text(`Current score: ${score}`);
    userChoice.splice(0, userChoice.length);
    randomized.splice(0, randomized.length);
  });

  //? MODES
  $("#modeSetting").on("click", () => {
    $("#modes").dialog("open");
  });

  //? Mode Two
  // $("#gameTwo").toggle();
  // $("#modeTwo").on("click", () => {
  //   $("#gameTwo").toggle();
  //   $(".main").toggle();
  // });
};

//*===================MAIN========================
const main = () => {
  buttons();
  user();
};
$(main);

//? play audio on every click (wont play if click is fast)
//? compares doesnt evaluate properly - check higher levels
//  only execute user after randomizer is done (it breaks the game)
//  strange behaviour with audio stop
//  ability to change the modes

// playbackRate with attr() wouldn't work. This worked:
// var player = $('#audioPlayer');
// player.attr('src', fileUrl);
// player[0].playbackRate = $('#playbackRate').val();
// The [0] important.
// https://www.developphp.com/video/JavaScript/Audio-Play-Speed-Setting-playbackRate-Tutorial
