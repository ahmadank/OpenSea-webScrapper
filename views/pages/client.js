var socket = io();
var el;
var interval = setInterval(() => getUpdatedInfo(), 10000)
getUpdatedInfo()
function getUpdatedInfo() {
  socket.emit('getUpdatedInfo', results => {
    results.length == 0 ? updateInfo(results) : ""
  });
}

function updateInfo(results) {
  var myDiv = document.getElementById("projects");
  myDiv.innerHTML = "Please add a project!"
  results.forEach(result => {
    myDiv.innerHTML += "<p>Project : " + result[0] + "  Prices : " + result[1] + "</p>"
  })
}


function setNewInterval(newInterval) {
  clearInterval(interval);
  try {
    interval = setInterval(() => getUpdatedInfo(), newInterval)
  } catch {
    interval = setInterval(() => getUpdatedInfo(), 10000)
  }
}