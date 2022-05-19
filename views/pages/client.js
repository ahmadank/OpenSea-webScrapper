onload();

// const socket = io('http://localhost:3000')
//call this function when a website loads
function onload() {
  $(document).ready(function () {
    //every 5 secs every jquery refreshs the data on the webpage
    setInterval(function () {
      console.log("Hello");
      $("#projects").load(window.location.href + " #request");
    }, 5000);
  });
}

// function addProject(){
//     console.log("This is working")
//   }
