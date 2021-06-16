//* LIGHT DURATION CANNOT BE SHORTER THAN NOTE INTERVAL
let score = 1;
let lightDuration = 500;
let noteInterval = 600;
let audioSpeed = 1.5;
let audioVolume = 0.8;

const userChoice = [];

const computerChoice = [];
// const computerBackgroundArr = [];
// const computerShadowArr = [];

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
// const pentatonicBackground = [
//   "#e31918",
//   "#ff7b00",
//   "#ffea00",
//   "#80ffdb",
//   "#2176ff",
// ];
// const pentatonicShadow = [
//   "lightpink",
//   "lightsalmon",
//   "#ffffb7",
//   "#caf0f8",
//   "#48cae4",
// ];
const pentatonic = ["red", "orange", "yellow", "turquoise", "blue"];

//! Functions
//*========GENERATES RANDOM PATTERN=============
const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.length);
    computerChoice.push(mode[random]);
    // computerBackgroundArr.push(pentatonicBackground[random]); //TODO pentatonicBackground
    // computerShadowArr.push(computerShadowArr[random]); //TODO petatonicShadow
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

    $(`#${e.target.id}-audio`).get(0).play(); //*===AUDIO===

    console.log("clicked", e.target.id);

    console.log("user", userChoice);
    console.log("computer", computerChoice);
    setTimeout(() => {
      if (userChoice.length === computerChoice.length) {
        compare(userChoice, computerChoice);
      }
    }, 150);
  });
};

//*============COMPARES ARRAYS=====================
const compare = (arr1, arr2) => {
  if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    nextLevel();
    return;
  } else {
    reset();
    return;
  }
};

//*============RESET ARRAYS====================
const resetArr = () => {
  $("#score").text(`Current score: ${score}`);
  userChoice.splice(0, userChoice.length);
  computerChoice.splice(0, computerChoice.length);
  //   computerBackgroundArr.splice(0, computerBackgroundArr.length);
};

//*=============GAME OVER===================
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
    // $(".audio").stop();
    // $(".audio").currentTime = 0;
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
    settingsValue();
    $("#score").text(`Current score: ${score}`);
    resetArr();
  });

  const settingsValue = () => {
    lightDuration = $("#lightDuration").val();
    noteInterval = $("#noteInterval").val();
    audioSpeed = $("#audioSpeed").val();
    audioVolume = $("#volume").val();
    score = $("#scoreInput").val();
    // parseInt(score); //! ADJUSTED SETTINGS SEEN AS STRING? - FIXED WITH score++ INSTEAD OF score+=1
  };

  //!==================MODE==================== CURRENTLY DISABLED ON HTML
  //   $("#modeSetting").on("click", () => {
  //     $("#modes").dialog("open");
  //   });

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
//! AS LONG AS FIRST NOTE IS SAME IF WILL ASSUME ALL ARE SAME AFTER?
// only execute user after generatorAudioVisual is done ???? (it breaks the game)
// reset the setTimeout - affecting audio
// check if arrays match before the length

// TODO SHOULD HAVE
// NICE STYLING DIAL PHONE TYPE?

// TODO NICE TO HAVE
// fix shadows etc in generatorAudioVisual
//* ability to change the modes!
//* ability to change the instrument
//* SETTINGS - print out current value of light duration, speed etc
