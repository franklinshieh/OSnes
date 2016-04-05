//gameController Screen
app.controller('gameSelection', function($scope, $http) {
  //used to hide and show the game selection screen
  // $scope.gameSelection = { hidden: false}
  $scope.toggleGameSelectionScreen = function() {
    gameSelectionScreen = document.getElementById('gameSelection');
    gameSelectionScreen.classList.add('hidden');
    // $scope.gameSelection.hidden = true;
    $scope.$apply();
  }
  window.toggleGameSelectionScreen = $scope.toggleGameSelectionScreen;

  document.getElementById('searchBar').addEventListener('focusin', function() {
    $("#searchBar").css("border-color", "#9767ab");
    $("#filterButton").css("border-left-color", "#9767ab");
    $("#filterButton").css("border-top-color", "#9767ab");
    $("#filterButton").css("border-bottom-color", "#9767ab");
  });

  document.getElementById('searchBar').addEventListener('focusout', function() {
    $("#searchBar").css("border-color", "#cccccc");
    $("#filterButton").css("border-color", "#cccccc");
  });
  
  //Fetches ROM data from ipfs, converts to readable method for emulator, loads in the ROM
  var loading = document.getElementById('loading');
  $scope.getRom = function (game) {
    // console.log('game', game);
    loading.classList.remove('hidden');
    setTimeout(function(){
      document.getElementById('loadingText2').classList.remove('hidden');
      document.getElementById('clickToRestart').classList.remove('hidden');
    }, 5000);
    return $http({
      method: 'GET',
      url: game.link,
      responseType: 'arraybuffer'
    }).then(function successCallback(response) {
        window.loadData(game.link.split("/")[5], new Uint8Array(response.data));
      }, function errorCallback(response) {
        // console.log('failuuuure', response);
      });
  }

  
  //list of available consoles: used to filter list of games
  $scope.consoleList = [{
    id: 1,
    name: 'NES',
  }, {
    id: 2,
    name: 'SNES',
  }, {
    id: 3,
    name: 'GB',
  }, {
    id: 4,
    name: 'GBA',
  }];

  //initialize showing all consoles/games
  $scope.selectedConsole = [1,2,3,4]; 
  
  //'import' list of games to render from gamesList.js
  $scope.games = window.gamesList;

  //methods to filter and show games from the list
  $scope.setSelectedConsole = function () {
    var id = this.console.id;
    if (_.contains($scope.selectedConsole, id)) {
      $scope.selectedConsole = _.without($scope.selectedConsole, id);
    } else {
      $scope.selectedConsole.push(id);
    }
    return false;
  };

  $scope.isChecked = function (id) {
    if (_.contains($scope.selectedConsole, id)) {
      return 'icon-ok pull-right';
    }
    return false;
  };

  $scope.checkAll = function () {
      $scope.selectedConsole = _.pluck($scope.consoleList, 'id');
  };

  //
  $scope.getIcon = function (id) {
    if(id===1) {
      return './frontend/img/nes.png';
    } else if (id===2) {
      return './frontend//img/snes.png';
    } else if (id===3) {
      return './frontend/img/gameboy.png';
    } else if (id===4) {
      return './frontend/img/gameboyadvance.png';
    }
  }

});