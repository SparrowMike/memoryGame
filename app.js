//*=====================DATA======================
let audioVolume = 0.8;
let lightDuration = 300;
let noteInterval = 600;
let audioSpeed = 1.5;
let score = 1;

//*====================ARRAYS=====================
const userChoice = [];
const computerChoice = [];
const motivation = [
  "Great Job!",
  "Well Played!",
  "Amazing!",
  "Keep Going!",
  "Keep It Up!",
  "Awesome!",
  "WOW!!!",
  "Mesmerizing!",
  "Astonishing!",
];
const pentatonic = ["red", "orange", "yellow", "turquoise", "blue"];

//! Functions
//*==========GENERATES RANDOM PATTERN=============
const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.length);
    computerChoice.push(mode[random]);
  }
  generatorAudioVisual();
};

//*=============COMPUTER OUTPUT AV================
const generatorAudioVisual = () => {
  computerChoice.forEach((item, index) => {
    let time = setTimeout(() => {
      //*======================AUDIO======================
      if (item) {
        document.querySelector(`#${item}-audio`).playbackRate = audioSpeed;
        document.querySelector(`#${item}-audio`).volume = audioVolume;
      }
      document.querySelector(`#${item}-audio`).pause();
      document.querySelector(`#${item}-audio`).currentTime = 0;
      $(`#${item}-audio`).get(0).play();

      //*======================VISUAL======================
      $(`#${item}`).css({
        opacity: 1,
        background: item,
        transition: "background-color 0.3s ease",
        "box-shadow": "0 0.5em 0.5em -0.4em #dcd9cf",
      });
      console.log(`Computer choice: #${item}`);

      setTimeout(() => {
        $(`#${item}`).removeAttr("style");
      }, lightDuration);
    }, noteInterval * index);
  });
};

//*================USER INPUT=====================
const user = () => {
  $(".game").on("click", (e) => {
    if (e.target.id) {
      userChoice.push(e.target.id);
      console.log("User clicked", e.target.id);
      document.querySelector(`#${e.target.id}-audio`).volume = audioVolume;
      document.querySelector(`#${e.target.id}-audio`).playbackRate = audioSpeed;
      document.querySelector(`#${e.target.id}-audio`).pause();
      document.querySelector(`#${e.target.id}-audio`).currentTime = 0;
      $(`#${e.target.id}-audio`).get(0).play();
      if (userChoice.length === computerChoice.length) {
        compare(userChoice, computerChoice);
      }
    }
  });
};

//*============COMPARES ARRAYS====================
const compare = (arr1, arr2) => {
  if (arr1.toString() === arr2.toString()) {
    nextLevel();
    keepUp();
    return;
  } else {
    reset();
    return;
  }
};

//*==============RESET ARRAYS=====================
const resetArr = () => {
  $("#score").text(`Current score: ${score}`);
  userChoice.splice(0, userChoice.length);
  computerChoice.splice(0, computerChoice.length);
};

//*================GAME OVER======================
const reset = () => {
  score = 1;
  resetArr();
  $("#popUp").dialog("open");
  return;
};

//*================MOTIVATION=====================
const keepUp = () => {
  let randomMot = motivation[Math.floor(Math.random() * motivation.length)];
  $(".middle").text(randomMot);
  $(".motivation").css({
    opacity: 0.75,
    transition: "background-color 0.8s ease",
    "box-shadow": "0 0.5em 0.5em -0.4em #dcd9cf",
  });
  setTimeout(() => {
    $(".middle").text("Click here to play again!");
    $(".motivation").removeAttr("style");
  }, 750);
};

//*=================LEVEL UP======================
const nextLevel = () => {
  score++;
  resetArr();
  setTimeout(() => {
    generator(score, pentatonic);
  }, 800);
  return;
};

//!=================BUTTONS=======================
const buttons = () => {
  //?==================POP UP'S===================
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

  //?================RESET THE GAME===============
  $(".reset").on("click", () => {
    score = 1;
    document.querySelector(".audio").pause();
    document.querySelector(".audio").currentTime = 0;
    resetArr();
    $("#popUp").dialog("close");
    generator(score, pentatonic);
  });

  //?=================BACK TO MAIN================
  $(".back").on("click", () => {
    $(".main").toggle();
    $("#gameOne").toggle();
    resetArr();
    document.querySelector(".audio").pause();
    document.querySelector(".audio").currentTime = 0;
    score = 1;
    $("#score").text(`Current score: ${score}`);
  });

  //?=================PANIC!!!!===================
  $(".panic").on("click", () => {
    location.reload();
  });

  //?============REPEAT THE PATTERN===============
  $(".playAgain").on("click", () => {
    generatorAudioVisual();
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
    $("#score").text(`Current score: ${score}`);
    settingsValue();
    resetArr();
  });

  //?==============COLLECT VALUE===================
  const settingsValue = () => {
    lightDuration = $("#lightDuration").val();
    noteInterval = $("#noteInterval").val();
    audioSpeed = $("#audioSpeed").val();
    audioVolume = $("#volume").val();
    score = $("#scoreInput").val();
  };

  //?==================ABOUT=======================
  $(".aboutWindow").dialog({ autoOpen: false }, { title: "About" });
  $(".about").on("click", () => {
    $(".aboutWindow").dialog("open");
  });
};

//*===================MAIN========================
const main = () => {
  buttons();
  user();
};
$(main);
