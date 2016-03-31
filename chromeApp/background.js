function newWindow() {
  return new Promise(function(resolve, reject) {
    chrome.app.window.create('index.html', {
      'bounds': {
        'width': Math.round(window.screen.availWidth*0.8),
        'height': Math.round(window.screen.availHeight*0.8)
      }
    }, resolve)
  })
}

function launch(file) {
  return new Promise(function(resolve, reject) {
    file.entry.file(resolve, reject)
  }).then(function(blob) {
    return newWindow().then(function(w) {
      w.contentWindow.filename = blob.name
      w.contentWindow.url = URL.createObjectURL(blob)
    })
  })
}

chrome.app.runtime.onLaunched.addListener(function(launchData) {
  if (launchData.items)
    launchData.items.forEach(launch)
  else
    newWindow()
})

chrome.app.window.current().onBoundsChanged.addListener(function() {
    var height = chrome.app.window.current().innerBounds.height;
    chrome.app.window.current().innerBounds.width = height * (16/9);
});
