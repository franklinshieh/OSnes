//pause game screen
app.controller('pauseScreen', function($scope) {
  $scope.chooseNewGame = function () {
    window.chooseNewGame();
  }

  window.systemSettings = {
    "extensions": {
      "gb": "gambatte",
      "gbc": "gambatte",
      "smc": "snes9x-next",
      "fig": "snes9x-next",
      "sfc": "snes9x-next",
      "swc": "snes9x-next",
      "gba": "vba-next",
      "nes": "quicknes",
      "sms": "picodrive",
      "gen": "picodrive",
      "smd": "picodrive",
      "md": "picodrive",
      "32x": "picodrive",
      "mgw": "gw",
      "vec": "vecx"
    },
    "overlays": {
      "gambatte": "./overlays/gamepads/gameboy/",
      "vba-next": "./overlays/gamepads/gba/",
      "snes9x-next": "./overlays/gamepads/snes/",
      "nestopia": "./overlays/gamepads/nes/"
    },
    "keys": {
      //Default keyboard key mappings:
      //IKJL Keys
      "75": "0",  //B
      "76": "1",  //A
      "74": "2",  //Y
      "73": "3",  //X
      //E, U
      "69": "4",  //L
      "85": "5",  //R
      //Enter, Shift
      "16": "8",  //Select
      "13": "9",  //Start
      //WASD keys
      "87": "12",  //Up
      "83": "13",  //Down
      "65": "14",  //Left
      "68": "15", //Right

      //Keys reserved for mobilecontroller; seldom used keys
      "59": "0",  //B
      "61": "1",  //A
      "108": "2",  //Y
      "173": "3",  //X

      "181": "4",  //L
      "182": "5",  //R

      "183": "8",  //Select
      "226": "9",  //Start
      
      "230": "12",  //Up
      "233": "13",  //Down
      "234": "14",  //Left
      "255": "15", //Right
    },
    "urlPrefix": "https://crossorigin.me/"
  }; 

  $scope.keyCodes = {
    3 : "break",
    8 : "backspace / delete",
    9 : "tab",
    12 : 'clear',
    13 : "enter",
    16 : "shift",
    17 : "ctrl ",
    18 : "alt",
    19 : "pause/break",
    20 : "caps lock",
    27 : "escape",
    32 : "spacebar",
    33 : "page up",
    34 : "page down",
    35 : "end",
    36 : "home ",
    37 : "left arrow ",
    38 : "up arrow ",
    39 : "right arrow",
    40 : "down arrow ",
    41 : "select",
    42 : "print",
    43 : "execute",
    44 : "Print Screen",
    45 : "insert ",
    46 : "delete",
    48 : "0",
    49 : "1",
    50 : "2",
    51 : "3",
    52 : "4",
    53 : "5",
    54 : "6",
    55 : "7",
    56 : "8",
    57 : "9",
    60 : "<",
    63 : "ß",
    65 : "a",
    66 : "b",
    67 : "c",
    68 : "d",
    69 : "e",
    70 : "f",
    71 : "g",
    72 : "h",
    73 : "i",
    74 : "j",
    75 : "k",
    76 : "l",
    77 : "m",
    78 : "n",
    79 : "o",
    80 : "p",
    81 : "q",
    82 : "r",
    83 : "s",
    84 : "t",
    85 : "u",
    86 : "v",
    87 : "w",
    88 : "x",
    89 : "y",
    90 : "z",
    91 : "Windows Key / Left ⌘ / Chromebook Search key",
    92 : "right window key ",
    93 : "Windows Menu / Right ⌘",
    96 : "numpad 0 ",
    97 : "numpad 1 ",
    98 : "numpad 2 ",
    99 : "numpad 3 ",
    100 : "numpad 4 ",
    101 : "numpad 5 ",
    102 : "numpad 6 ",
    103 : "numpad 7 ",
    104 : "numpad 8 ",
    105 : "numpad 9 ",
    106 : "multiply ",
    107 : "add",
    109 : "subtract ",
    110 : "decimal point",
    111 : "divide ",
    112 : "f1 ",
    113 : "f2 ",
    114 : "f3 ",
    115 : "f4 ",
    116 : "f5 ",
    117 : "f6 ",
    118 : "f7 ",
    119 : "f8 ",
    120 : "f9 ",
    121 : "f10",
    122 : "f11",
    123 : "f12",
    124 : "f13",
    125 : "f14",
    126 : "f15",
    127 : "f16",
    128 : "f17",
    129 : "f18",
    130 : "f19",
    144 : "num lock ",
    145 : "scroll lock",
    160 : "^",
    163 : "#",
    167 : "page forward (Chromebook)",
    171 : "~ + * key",
    174 : "decrease volume level",
    175 : "increase volume level",
    176 : "next",
    177 : "previous",
    178 : "stop",
    179 : "play/pause",
    180 : "e-mail",  //
    186 : "semi-colon / ñ",
    187 : "equal sign ",
    188 : "comma",
    189 : "dash ",
    190 : "period ",
    191 : "forward slash / ç",
    192 : "grave accent ",
    193 : "?, / or °",
    194 : "numpad period (chrome)",
    219 : "open bracket ",
    220 : "back slash ",
    221 : "close bracket ",
    222 : "single quote ",
    223 : "`",
    224 : "left or right ⌘ key (firefox)",
    225 : "altgr", 
  };

  var newKeyMappings = {
    //Keys reserved for mobilecontroller; seldom used keys. 
    //Mapping new keys overwrite all existing mappings but we want to keep these so we include them here
    "59": "0",  //B
    "61": "1",  //A
    "108": "2",  //Y
    "173": "3",  //X

    "181": "4",  //L
    "182": "5",  //R

    "183": "8",  //Select
    "226": "9",  //Start
    
    "230": "12",  //Up
    "233": "13",  //Down
    "234": "14",  //Left
    "255": "15", //Right

  };

  //used as a cache to store the last state of keys; used when user clicks cancel
  var oldKeyMappings = {};
  
  document.querySelector('body').addEventListener('keydown', function (e) {
    // console.log('keycode: ', e.keyCode);
    // console.log('code: ', e.code);

    //only do the following if the emulator has started
    if ($('#retro').length < 1){
      return;
    }
    if(retro.classList.contains('hidden')) {
      e.preventDefault();
      try {
        //if the user is not trying to map to a key reserved to the mobilecontroller, then map in new keys
        if(e.keyCode !== "59" && e.keyCode !=="61" && e.keyCode !=="108" && e.keyCode !=="173" && e.keyCode !=="181" && e.keyCode !=="182" && e.keyCode !=="183" && e.keyCode !=="226" && e.keyCode !=="230" && e.keyCode !=="233" && e.keyCode !=="234" && e.keyCode !=="235") {
          document.getElementById(document.activeElement.id).value = $scope.keyCodes[e.keyCode];
          switch (document.activeElement.id) {
            case 'aButton':
              newKeyMappings[e.keyCode] = '1';
              break;
            case 'bButton':
              newKeyMappings[e.keyCode] = '0';
              break;
            case 'xButton':
              newKeyMappings[e.keyCode] = '3';
              break;
            case 'yButton':
              newKeyMappings[e.keyCode] = '2';
              break;
            case 'startButton':
              newKeyMappings[e.keyCode] = '9';
              break;
            case 'selectButton':
              newKeyMappings[e.keyCode] = '8';
              break;
            case 'upArrow':
              newKeyMappings[e.keyCode] = '12';
              break;
            case 'downArrow':
              newKeyMappings[e.keyCode] = '13';
              break;
            case 'leftArrow':
              newKeyMappings[e.keyCode] = '14';
              break;
            case 'rightArrow':
              newKeyMappings[e.keyCode] = '15';
              break;
            case 'lShoulder':
              newKeyMappings[e.keyCode] = '4';
              break;
            case 'rShoulder':
              newKeyMappings[e.keyCode] = '5';
              break;
            default:
              break;
          }
        }
      }
      catch(err) {
        // console.log('error', err); //not focused on a form input tag
      }
    }
  });

  $scope.getValue = function(button) {
    switch (button) {
      case 'aButton':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="1" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'bButton':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="0" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'xButton':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="3" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'yButton':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="2" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'startButton':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="9" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'selectButton':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="8" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'upArrow':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="12" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'downArrow':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="13" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'leftArrow':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="14" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'rightArrow':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="15" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'lShoulder':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="4" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'rShoulder':
        for(var key in systemSettings.keys) {
          if(systemSettings.keys[key]==="5" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      default:
        break;
    }
  } 

  $scope.getOldValue= function(button) {
    switch (button) {
      case 'aButton':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="1" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'bButton':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="0" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'xButton':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="3" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'yButton':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="2" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'startButton':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="9" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'selectButton':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="8" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'upArrow':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="12" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'downArrow':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="13" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'leftArrow':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="14" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'rightArrow':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="15" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'lShoulder':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="4" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'rShoulder':
        for(var key in oldKeyMappings) {
          if(oldKeyMappings[key]==="5" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      default:
        break;
    }
  } 

  $scope.getNewValue= function(button) {
    switch (button) {
      case 'aButton':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="1" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'bButton':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="0" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'xButton':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="3" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'yButton':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="2" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'startButton':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="9" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'selectButton':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="8" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'upArrow':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="12" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'downArrow':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="13" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'leftArrow':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="14" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'rightArrow':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="15" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'lShoulder':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="4" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      case 'rShoulder':
        for(var key in newKeyMappings) {
          if(newKeyMappings[key]==="5" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
            return $scope.keyCodes[key];
          }
        }
        break;
      default:
        break;
    }
  } 

  $scope.disabled = true;
  $scope.validationError1 = true;
  $scope.validationError2 = true;

  $scope.editKeyMappings = function() {
    $scope.disabled = false;
    oldKeyMappings = {};
    newKeyMappings = {};

    for(keyMapping in systemSettings.keys) {
      oldKeyMappings[keyMapping] = systemSettings.keys[keyMapping];
    };
    // console.log('oldKeyMappings',oldKeyMappings);

    $('#keyMappingsForm').find("input").each(function(ev){
       $(this).val("click here to edit");
    });
  };

  $scope.submitNewKeyMappings = function() {

    var toSubmit = true;

    $scope.validationError1 = true;
    $scope.validationError2 = true;

    var newValueTextArray = []
    
    $('#keyMappingsForm').find("input").each(function(){

      var id = $(this).attr('id');

      var newValueText = $scope.getNewValue(id);
      document.getElementById(id).value = newValueText;

      newValueTextArray.push(newValueText);

    });

    if(_.contains(newValueTextArray, undefined)) {
      var toSubmit = false;
      $scope.validationError1 = false;
      return;
    }
    
    if(toSubmit) {
      $scope.validationError1 = true;

      systemSettings.keys = {};
      systemSettings.keys = newKeyMappings;
      newKeyMappings = {
        //Keys reserved for mobilecontroller; seldom used keys. 
        //Mapping new keys overwrite all existing mappings but we want to keep these so we include them here
        "59": "0",  //B
        "61": "1",  //A
        "108": "2",  //Y
        "173": "3",  //X

        "181": "4",  //L
        "182": "5",  //R

        "183": "8",  //Select
        "226": "9",  //Start
        
        "230": "12",  //Up
        "233": "13",  //Down
        "234": "14",  //Left
        "255": "15", //Right
      };

      $scope.disabled = true;
    }
  };

  $scope.cancelSubmitNewKeyMappings = function() {
    $('#keyMappingsForm').find("input").each(function(){
      var id = $(this).attr('id');
      var oldValueText = $scope.getOldValue(id);
      // console.log("oldValueText",oldValueText)
      document.getElementById(id).value = oldValueText;
    });
    $scope.disabled = true;
    $scope.validationError1 = true;

  }

});