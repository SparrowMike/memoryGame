//* LIGHT DURATION CANNOT BE SHORTER THAN NOTE INTERVAL
let audioVolume = 0.8;
let lightDuration = 300;
let noteInterval = 600;
let audioSpeed = 1.5;
let score = 1;

const userChoice = [];

const computerChoice = [];

//* Mode Options
const majorScale = [
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "purple",
];

const pentatonic = ["red", "orange", "yellow", "turquoise", "blue"];

//! Functions
//*========GENERATES RANDOM PATTERN=============
const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.length);
    computerChoice.push(mode[random]);
  }
  generatorAudioVisual();
};

//*==========COMPUTER OUTPUT AV===============
const generatorAudioVisual = () => {
  computerChoice.forEach((item, index) => {
    setTimeout(() => {
      //*======================AUDIO======================
      if (item) {
        document.querySelector(`#${item}-audio`).playbackRate = audioSpeed;
        document.querySelector(`#${item}-audio`).volume = audioVolume;
      }
      document.querySelector(`#${item}-audio`).pause();
      document.querySelector(`#${item}-audio`).currentTime = 0;
      $(`#${item}-audio`).get(0).play();

      console.log("computer", computerChoice[index]);

      //*======================VISUAL======================
      $(`#${item}`).css({
        background: `${[item]}`,
        transition: "background-color 0.3s ease",
      });
      setTimeout(() => {
        $(`#${item}`).css({
          background: "",
        });
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
      document.querySelector(`#${e.target.id}-audio`).volume = audioVolume;
    }
    document.querySelector(`#${e.target.id}-audio`).pause();
    document.querySelector(`#${e.target.id}-audio`).currentTime = 0;
    $(`#${e.target.id}-audio`).get(0).play();

    // console.log("clicked", e.target.id);
    // console.log("user", userChoice);
    // console.log("computer", computerChoice);

    setTimeout(() => {
      if (userChoice.length === computerChoice.length) {
        compare(userChoice, computerChoice);
      }
    }, 150);
  });
};

//*============COMPARES ARRAYS=====================
const compare = (arr1, arr2) => {
  //   if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
  //     nextLevel();
  //     return;
  //   } else {
  //     reset();
  //     return;
  //   }

  //! OR !\\ more testing !
  if (arr1.toString() === arr2.toString()) {
    nextLevel();
    return;
  } else {
    reset();
    return;
  }
};

//*==============RESET ARRAYS====================
const resetArr = () => {
  $("#score").text(`Current score: ${score}`);
  userChoice.splice(0, userChoice.length);
  computerChoice.splice(0, computerChoice.length);
};

//*===============GAME OVER===================
const reset = () => {
  score = 1;
  resetArr();
  $("#popUp").dialog("open");
  return;
};

//*=============LEVEL UP====================
const nextLevel = () => {
  score++;
  resetArr();
  setTimeout(() => {
    generator(score, pentatonic);
  }, 800);
  return;
};

//!======================BUTTONS========================
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
    document.querySelector(".audio").pause();
    document.querySelector(".audio").currentTime = 0;
    resetArr();
    $("#popUp").dialog("close");
    generator(score, pentatonic);
  });

  //?===============BACK TO MAIN===============
  $(".back").on("click", () => {
    $(".main").toggle();
    $("#gameOne").toggle();
    document.querySelector(".audio").pause();
    document.querySelector(".audio").currentTime = 0;
    // clearTimeout(generatorAudioVisual); //! HOWTO CLEAR TIMEOUT!!
    score = 1;
    resetArr();
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

  const settingsValue = () => {
    lightDuration = $("#lightDuration").val();
    noteInterval = $("#noteInterval").val();
    audioSpeed = $("#audioSpeed").val();
    audioVolume = $("#volume").val();
    score = $("#scoreInput").val();
    //! ADJUSTED SCORE SETTINGS SEEN AS STRING? - FIXED WITH score++ INSTEAD OF score+=1
  };

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

// TODO MUST HAVE
// reset the setTimeout - affecting audio and not allowing the reset to execute

// TODO SHOULD HAVE
// NICE STYLING DIAL PHONE TYPE

// TODO NICE TO HAVE
// fix shadows etc in generatorAudioVisual...
//* SETTINGS - print out current value of light duration, speed etc
//* ability to change the instrument
//* ability to change the modes!
// BPM!!!
