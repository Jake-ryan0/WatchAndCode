/* Realized that property assignment by bracket notation uses strings
*/  

(function() {
  const libraryStorage = {};

  function loadAndAddLibraries(libraryName, dependenciesArr, callback) {
    // retrieving / using a lib from libraryStorage
    // librayName is alr a string
    if (arguments.length === 1) return libraryStorage[libraryName];
    else { // saving a lib into libraryStorage
      const arrOfDependentLibraries = [];
      if (Array.isArray(dependenciesArr)) {
        // getting an array of all the libraries (variables) needed.
        for (let i = 0; i < dependenciesArr.length; i++) {
          const nameOfLibToload = dependenciesArr[i];
          arrOfDependentLibraries.push(loadAndAddLibraries(nameOfLibToload));
        }

        libraryStorage[libraryName] = callback.apply(this, arrOfDependentLibraries);  

      }
    }
  }

  window['loadAndAddLibraries'] = loadAndAddLibraries; 

})();