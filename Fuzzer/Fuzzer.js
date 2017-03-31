// import helper functions
var {requestData, writeData, handleErr} = require('./helpers');

// generates an array of values from 0 - 999
var inputs = [...Array(1000)].map((none,index) => index); 

/**
 * calls helper functions on an array of test inputs
 * @param {numberArray} testInputs                 
 * @return {Void} 
 */
function getData(testInputs) {
  testInputs.forEach( input => requestData(input)
    .then( data => {
      if (data.response.statusCode !== 404) {
        writeData(data)
      }
    })
    .catch(handleErr))    
}

getData(inputs);


