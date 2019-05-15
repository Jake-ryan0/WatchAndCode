function runWithDebugger(inputFunction) {
  debugger; 
  inputFunction();
}

function logTenNumbers() {
  for(var i = 0; i < 10; i++) {
    console.log(i);
  }
}

setTimeout(function() {
  console.log("5 seconds is up");
}, 5000);

function logNames(name) {
  console.log(name);
}

var students = ["John", "Mark", "Ben", "Alex"];

students.forEach(logNames); 

// Our own forEach
function forEach(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i]); 
  }
}

forEach(students, logNames);