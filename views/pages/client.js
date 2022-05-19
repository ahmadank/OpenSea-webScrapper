var socket = io();
var el;
var interval = setInterval(() => getUpdatedInfo(), 10000)
getUpdatedInfo()
function getUpdatedInfo() {
  socket.emit('getUpdatedInfo', results => {
    updateInfo(results)
  });
}

function updateInfo(results) {
  console.log(JSON.stringify(results))
  var myDiv = document.getElementById("projects");
  myDiv.innerHTML = ""
  results.forEach(result =>{
    myDiv.innerHTML += "<p>Project : " + result[0] + "  Prices : "+ result[1] + "</p>"
  })
}


function setInterval(interval){
  try{
    interval = setInterval(() => getUpdatedInfo(), interval)
  }catch{
    interval = setInterval(() => getUpdatedInfo(), 10000)
  }
}