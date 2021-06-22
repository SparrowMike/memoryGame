//!======================MODES========================
const pentatonic = {
  id: ["C", "D", "E", "G", "A"],
  colour: ["red", "orange", "yellow", "turquoise", "blue"],
  rotate: ["270deg", "345deg", "60deg", "120deg", "195deg"],
  hoverBackground: ["#e31918", "#ff7b00", "#ffea00", "#80ffdb", "#072ac8"],
  shadow: ["lightpink", "lightsalmon", "#ffffb7", "#caf0f8", "#48cae4"],
  audio: [
    "/Sounds/C4.wav",
    "/Sounds/D4.wav",
    "/Sounds/E4.wav",
    "/Sounds/G4.wav",
    "/Sounds/A4.wav",
  ],
};

const major = {
  id: ["1", "2", "3", "4", "5", "6", "7"],
  colour: ["red", "orange", "green", "yellow", "turquoise", "blue", "purple"],
  rotate: [
    "270deg",
    "321.43deg",
    "12.86deg",
    "64.29deg",
    "115.72deg",
    "167.15deg",
    "218.58deg",
  ],
  hoverBackground: [
    "#e31918",
    "#ff7b00",
    "#38b000",
    "#ffea00",
    "#80ffdb",
    "#072ac8",
    "#7e0afa",
  ],
  shadow: [
    "lightpink",
    "lightsalmon",
    "TBC",
    "#ffffb7",
    "#caf0f8",
    "#48cae4",
    "TBC",
  ],
  audio: [
    "/Sounds/C4.wav",
    "/Sounds/D4.wav",
    "/Sounds/E4.wav",
    "/Sounds/F4.wav",
    "/Sounds/G4.wav",
    "/Sounds/A4.wav",
    "/Sounds/B4.wav",
  ],
};

//*====================ARRAYS=====================
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

const userChoice = [];
const computerChoice = [];

//*=====================DATA======================
let audioVolume = 0.8;
let lightDuration = 525;
let noteInterval = 600;
let audioSpeed = 1;
let score = 1;

let mode = pentatonic;

const gameWindow = (mode) => {
  for (let i = 0; i < mode.id.length; i++) {
    $audio = $("<audio>")
      .attr("class", `${mode.id[i]}-audio`)
      .attr("id", `${mode.id[i]}-audio`)
      .attr("src", mode.audio[i])
      .addClass("audio");
    $(`#${mode.id[i]}`).append($audio);

    $(`#${mode.id[i]}:nth-child(${[i + 1]})`)
      .css({
        transform: `rotate(${mode.rotate[i]}) translateX(125px)`,
      })
      .css("background-color", mode.colour[i]);

    $(`#${mode.id[i]}`)
      .on("mouseenter", () => {
        $(`#${mode.id[i]}:nth-child(${[i + 1]})`).css({
          "box-shadow": ` 0 0.5em 0.5em -0.4em ${mode.hoverBackground[i]}`,
        });
      })
      .on("mouseleave", () => {
        $(`#${mode.id[i]}:nth-child(${[i + 1]})`).css("box-shadow", "none");
      });
  }
};

//!=================MODE PICKED========================
//*============GENERATES RANDOM PATTERN==============
const generator = (score, mode) => {
  for (let i = 1; i <= score; i++) {
    let random = Math.floor(Math.random() * mode.id.length);
    computerChoice.push(mode.id[random]);
  }
  generatorAudioVisual();
};

// //! Functions
//*=============COMPUTER OUTPUT AV================
const generatorAudioVisual = () => {
  computerChoice.forEach((item, index) => {
    setTimeout(() => {
      //*======================AUDIO======================
      $(`#${item}-audio`).prop(
        { playbackRate: audioSpeed },
        { volume: audioVolume }
      );
      $(`#${item}-audio`).trigger("pause").prop("currentTime", 0);
      $(`#${item}-audio`).get(0).play();
      //*======================VISUAL======================
      $(`#${item}`).css({
        opacity: 1,
        background: item,
        transition: "background-color 0.3s ease",
        "box-shadow": "0 0.5em 0.5em -0.4em #dcd9cf",
      });
      setTimeout(() => {
        $(`#${item}`).css({
          opacity: "",
          background: item,
          transition: "background-color 0.3s ease",
          "box-shadow": "none",
        });
      }, lightDuration);
    }, noteInterval * index);
  });
  return;
};

//*================USER INPUT=====================
const user = () => {
  $(".game").on("click", (e) => {
    if (e.target.id) {
      userChoice.push(e.target.id);
      $(`.${e.target.id}-audio`).prop(
        { playbackRate: audioSpeed },
        { volume: audioVolume }
      );
      $(`.${e.target.id}-audio`).trigger("pause").prop("currentTime", 0);
      $(`.${e.target.id}-audio`).get(0).play();
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

//*=================LEVEL UP======================
const nextLevel = () => {
  score++;
  resetArr();
  setTimeout(() => {
    generator(score, mode);
  }, 800);
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

//!=================BUTTONS=======================
const buttons = () => {
  //?==================POP UP'S===================
  $("#popUp").dialog({ autoOpen: false }, { title: "Game Over!" });
  $("#modes").dialog({ autoOpen: false }, { title: "Modes" });

  //?===============START THE GAME================
  $("#gameWindowOne, #gameWindowTwo, #gameButtons").toggle();
  $("#gameOn").on("click", () => {
    if (mode === pentatonic) {
      $("#gameWindowOne").toggle();
    } else {
      $("#gameWindowTwo").toggle();
    }
    $("#gameButtons").toggle();
    $(".main").toggle();
    gameWindow(mode);
    setTimeout(() => {
      generator(score, mode);
    }, 300);
  });

  //?==============REPEAT THE PATTERN=============
  $(".playAgain").on("click", () => {
    generatorAudioVisual();
  });

  //?================RESET THE GAME===============
  $(".reset").on("click", () => {
    $(".audio").trigger("pause");
    $(".audio").prop("currentTime", 0);
    $("#popUp").dialog("close");
    resetArr();
    score = 1;
    generator(score, mode);
  });

  //?=================BACK TO MAIN================
  $(".back").on("click", () => {
    $(".main").toggle();
    if (mode === pentatonic) {
      $("#gameWindowOne").toggle();
    } else {
      $("#gameWindowTwo").toggle();
    }
    $("#gameButtons").toggle();
    $(".audio").trigger("pause");
    $(".audio").prop("currentTime", 0);
    resetArr();
    score = 1;
    $("#score").text(`Current score: ${score}`);
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
    noteInterval = $("#noteInterval").val();
    audioSpeed = $("#audioSpeed").val();
    audioVolume = $("#volume").val();
    score = $("#scoreInput").val();

    if ($("#mode").val() === "pentatonic") {
      mode = pentatonic;
    } else if ($("#mode").val() === "major") {
      mode = major;
    }
    lightDuration = noteInterval - 75;
  };

  //?==================ABOUT=======================
  $(".aboutWindow").dialog({ autoOpen: false }, { title: "About" });
  $(".about").on("click", () => {
    $(".aboutWindow").dialog("open");
  });
};

//?=================PANIC!!!!===================
$(".panic").on("click", () => {
  location.reload();
});

//*===================MAIN========================
const main = () => {
  buttons();
  user();
};
$(main);

//!=====================================================================================================================================================================

// TODO MUST HAVE
// reset the setTimeout - affecting audio and not allowing the reset to execute - walkaround location.reload()
// Reset timeOut on repeat button !!!
// on/off for lights and sound?
//! RESET THE CSS AFTER BACK OR RESET?

// TODO SHOULD HAVE

// TODO NICE TO HAVE
// Additional explanation
//* SETTINGS - print out current value of light duration, speed etc
//* ability to change the instrument
// Notes left countdown-maybe
// CHORDS?!
// Arpegios
// Ability to use the keyboard
// BPM!!!
