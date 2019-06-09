/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */


var TinyTestUtil = {
  renderTestingSummary: function (tests, failures) {
      var numTestsRun = Object.keys(tests).length;
      var numFailures = failures;
      var numSuccesses = numTestsRun - numFailures;

      var summaryString = 'Ran ' + numTestsRun + " tests: "
          + numSuccesses + ' successes, '
          + numFailures + ' failures.';

      var summaryElement = document.createElement('h1');
      summaryElement.textContent = summaryString;
      document.body.appendChild(summaryElement);

  }
}

var TinyTest = {
  
  run: function(tests) {

      var failures = 0;
      var numTestsRun = Object.keys(tests).length;
      var numSuccesses = numTestsRun - failures;

      for (var testName in tests) {
          var testAction = tests[testName];
          try {
              testAction.apply(this);
              var passMessage = '%c' + testName;
              console.log(passMessage, "color:green;");
          } catch (e) {
              failures++;
              var failMessage = '%c' + testName;
              console.groupCollapsed(failMessage, 'color:red;');
              console.error(e.stack);
              console.groupEnd();
          }
      }

      setTimeout(function () { // Give document a chance to complete
          if (window.document && document.body) {
              document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
          }

          TinyTestUtil.renderTestingSummary(tests, failures);
      }, 0);
  },

  fail: function (msg) {
      throw new Error('fail(): ' + msg);
  },

  assert: function (value, msg) {
      if (!value) {
          throw new Error('assert(): ' + msg);
      }
  },

  assertEquals: function (expected, actual) {
      if (expected != actual) {
          throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
      }
  },

  assertStrictEquals: function (expected, actual) {
      if (expected !== actual) {
          throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
      }
  },

};

var fail = TinyTest.fail.bind(TinyTest),
  assert = TinyTest.assert.bind(TinyTest),
  assertEquals = TinyTest.assertEquals.bind(TinyTest),
  eq = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
  assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
  tests = TinyTest.run.bind(TinyTest);
