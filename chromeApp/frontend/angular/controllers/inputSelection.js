//inputSelection screen
app.controller('inputSelection', function($scope) {
  $scope.ipAddress = 'filler';
  $scope.ipFound = false;
  // $scope.inputSelection = { hidden: false}
  $scope.toggleInputSelectionScreen = function() {
    window.retro.start();
    // $scope.inputSelection.hidden = true;
    inputSelectionScreen = document.getElementById('inputSelectionScreen');
    inputSelectionScreen.classList.add('hidden');
    $scope.$apply();
  }
  var qrScreen = document.getElementById('qrScreen');
  $scope.openQRScreen = function() {
    qrScreen.classList.remove('hidden');
  };
  $scope.closeQRScreen = function() {
    // console.log('close click');
    qrScreen.classList.add('hidden');
  };

  window.toggleInputSelectionScreen = $scope.toggleInputSelectionScreen;
  window.openQRScreen = $scope.openQRScreen;

  //Handle Keyboard Icon 
  document.getElementById('keyboardIcon').addEventListener('click', window.toggleInputSelectionScreen);
  document.getElementById('keyboardIcon').addEventListener('mouseover', function() {
    $("#keyboardIcon").css('background-image', 'url(' + './frontend/img/desktopiconhighlight.png' + ')');
  });
  document.getElementById('keyboardIcon').addEventListener('mouseout', function() {
    $("#keyboardIcon").css('background-image', 'url(' + './frontend/img/desktopicondark.png' + ')');
  });

  //Handle Mobile Icon
  document.getElementById('mobileIcon').addEventListener('click', window.openQRScreen);
  document.getElementById('mobileIcon').addEventListener('mouseover', function() {
    $("#mobileIcon").css('background-image', 'url(' + './frontend/img/desktopwithmobileiconhighlight.png' + ')');
  });
  document.getElementById('mobileIcon').addEventListener('mouseout', function() {
    $("#mobileIcon").css('background-image', 'url(' + './frontend/img/desktopwithmobileicondark.png' + ')');
  });


  // chrome.system.network.getNetworkInterfaces(function (ipAddresses) {
  //   ipAddresses.forEach(function (ipAddress) {
  //     console.log(ipAddress);
  //     if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipAddress.address)) {
  //       $scope.title = 'IP FOUND'

  //       $scope.ipAddress = ip4 = ipAddress.address;
  //       var toQ = $scope.ipAddress + ':' + port;

  //       if($scope.ipFound === false) {
  //         new QRCode(document.getElementById('qrCode'), toQ);
  //       }

  //       $scope.ipFound = true;

  //       // force scope to update
  //       $scope.$apply()
  //     }
  //   });

  // });

});