let score = 1;

//? LIGHT DURATION CANNOT BE SHORTER THAN NOTE INTERVAL
let lightDuration = 500;
let noteInterval = 1250;
let audioSpeed = 1;
// let audioVolume =

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
      $(`#${item}-audio`).stop(); //*===AUDIO===
      $(`#${item}-audio`).currentTime = 0; //*===AUDIO===
      $(`#${item}-audio`).get(0).play(); //*===AUDIO===
      $(`#${item}`).css("background", randomized[index]);
      if (item) {
        document.querySelector(`#${item}-audio`).playbackRate = audioSpeed;
      }
      setTimeout(() => {
        $(`#${item}`).css("background", "");
        $(`#${item}`).css("transition", "background-color 0.6s ease");
      }, lightDuration);
    }, noteInterval * index);
  });
};

//*================USER INPUT=====================
const user = () => {
  $(".playBox").on("click", (e) => {
    userChoice.push(e.target.id);
    if (e.target.id) {
      document.querySelector(`#${e.target.id}-audio`).playbackRate = audioSpeed;
    }
    $(`#${e.target.id}-audio`).stop(); //*===AUDIO===
    $(`#${e.target.id}-audio`).currentTime = 0; //*===AUDIO===
    $(`#${e.target.id}-audio`).get(0).play(); //*===AUDIO===
    console.log("clicked", e.target.id);
    setTimeout(() => {
      compare(userChoice, randomized);
    }, 500);
  });
};

//*============COMPARES ARRAYS=====================
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

//*============RESET ARRAYS====================
const resetArr = () => {
  $("#score").text(`Current score: ${score}`);
  userChoice.splice(0, userChoice.length);
  randomized.splice(0, randomized.length);
};

//*===========GAME OVER===================
const reset = () => {
  score = 1;
  resetArr();
  $("#popUp").dialog("open");
  return;
};

//*=============LEVEL UP====================
const nextLevel = () => {
  score += 1;
  resetArr();
  setTimeout(() => {
    generator(score, pentatonic);
  }, 1200);
  return;
};

//! BUTTONS
const buttons = () => {
  //?==============POP UP'S====================
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

  //?=============RESET THE GAME================
  $(".reset").on("click", () => {
    score = 1;
    $(".audio").stop();
    $(".audio").currentTime = 0;
    resetArr();
    $("#popUp").dialog("close");
    generator(score, pentatonic);
  });

  //?================SETTINGS=====================
  $(".settingsWindow").dialog({ autoOpen: false }, { title: "Settings" });
  $(".settings").on("click", () => {
    $(".settingsWindow").dialog("open");
    score = 1;
    resetArr();
  });
  $("#confirm").on("click", () => {
    $(".settingsWindow").dialog("close");
    lightDuration = $("#lightDuration").val();
    noteInterval = $("#noteInterval").val();
    audioSpeed = $("#audioSpeed").val();
    // console.log(lightDuration);
  });

  //?===============AUDIO SETTINGS=============}

  //?===============BACK TO MAIN===============
  $(".back").on("click", () => {
    $(".main").toggle();
    $("#gameOne").toggle();
    $(".audio").stop();
    score = 1;
    resetArr();
  });

  //?==================MODE====================
  $("#modeSetting").on("click", () => {
    $("#modes").dialog("open");
  });

  //?================Mode Two=================
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

// TODO
//? play audio on every click (wont play if click is fast)
//? compares doesnt evaluate properly - check higher levels
//  only execute user after randomizer is done (it breaks the game)
//  strange behaviour with audio stop
//  ability to change the modes
//* ability to change the speed
//  print out current value of light duration, speed etc
//  check if arrays match before the length

// playbackRate with attr() wouldn't work. This worked:
// let audioSpeed = $("#audioPlayer");
// audioSpeed.attr("src", fileUrl);
// audioSpeed[0].playbackRate = $("#audioSpeed").val();
// console.log(audioSpeed);
// The [0] important.

// https://www.developphp.com/video/JavaScript/Audio-Play-Speed-Setting-playbackRate-Tutorial

// const audio = () => {
//   audioSpeed = document.getElementById("audioSpeed");
//   audioSpeed.addEventListener("change", changeSpeed);
//   const changeSpeed = (e) => {
//     $(".audio").playbackRate = e.target.value;
//   };
// };

// audio();

// $(".audio").playbackRate(2);
// document.querySelector("audio").playbackRate = 2;

// $(".audio").jPlayer("option", "playbackRate", 2);

//* KEPT JUST IN CASE
//   } else if (item === "orange") {
//     document.querySelector("#orange-audio").playbackRate = audioSpeed;
//   } else if (item === "yellow") {
//     document.querySelector("#yellow-audio").playbackRate = audioSpeed;
//   } else if (item === "green") {
//     document.querySelector("#green-audio").playbackRate = audioSpeed;
//   } else if (item === "turquoise") {
//     document.querySelector("#turquoise-audio").playbackRate = audioSpeed;
//   } else if (item === "blue") {
//     document.querySelector("#blue-audio").playbackRate = audioSpeed;
//   } else if (item === "yellow") {
//     document.querySelector("#yellow-audio").playbackRate = audioSpeed;

// else if (e.target.id === "orange") {
//   document.querySelector("#orange-audio").playbackRate = audioSpeed;
// } else if (e.target.id === "yellow") {
//   document.querySelector("#yellow-audio").playbackRate = audioSpeed;
// } else if (e.target.id === "green") {
//   document.querySelector("#green-audio").playbackRate = audioSpeed;
// } else if (e.target.id === "turquoise") {
//   document.querySelector("#turquoise-audio").playbackRate = audioSpeed;
// } else if (e.target.id === "blue") {
//   document.querySelector("#blue-audio").playbackRate = audioSpeed;
// } else if (e.target.id === "yellow") {
//   document.querySelector("#yellow-audio").playbackRate = audioSpeed;
// }
