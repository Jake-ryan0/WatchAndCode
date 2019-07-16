function runWithDebugger(callback, arrOfArgumentsForCallback) {
  debugger;
  callback.apply(this, arrOfArgumentsForCallback);
}