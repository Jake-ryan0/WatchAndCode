function runWithDebugger(callback, arrOfArgumentsForCallback) {


  callback.apply(this, arrOfArgumentsForCallback);
}