var socket = io();
var el;
var interval = setInterval(() => getUpdatedInfo(), 300000)
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
    myDiv.innerHTML += "<p>Project : " + result[0] + "  Price : <p style=color:gold>" + result[1] + "<br></p></p>"
  })
}


function setNewInterval(newInterval) {
  clearInterval(interval);
  try {
    interval = setInterval(() => getUpdatedInfo(), newInterval)
  } catch {
    interval = setInterval(() => getUpdatedInfo(), 300000)
  }
}


function updateTimeInterval(){
  var value = document.getElementById("newInterval").value;
  if(value < 5) alert("Enter a number greater than 5 minutes please")
  else{
    try{
    value = value * 60000
    setNewInterval(parseInt(value))
    }catch{
      setNewInterval(300000)
      alert("Enter a number greater than 5 minutes please")
    }
  }
}

window.onbeforeunload = function() {
  clearInterval(interval);
};