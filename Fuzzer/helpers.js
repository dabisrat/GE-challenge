var request = require('request');
var fs = require('fs');
var path = require('path');
var tests = require('./tests')
 
 /**
 * asynchronously GETS data from a server using JS native promises
 * @param {String} path 
 * @param {String} host          optional default = http://localhost:8085/ 
 * @param {Number} retryAttempts optional default=15
 * @return {Promise} 
 */
  function requestData(path, host = "http://localhost:8085/", retryAttempts = 15) {
    var url = host + path;
    return new Promise(function (resolve, reject) {
      request(url, function (err, response, body){
        if (err) {
          if (err.code === 'ECONNRESET' && retryAttempts > 0) {
            resolve(requestData(path,host,retryAttempts--))
          } else {
            console.log(err)
            return reject({
              input:path,
              message:err
            });
          }
        }
        resolve({
          path:path,
          response: response,
          body: body
        });
      });
    });
  };
  
/**
 * asynchronously writes to disk, write path is determined by which tests pass
 * @param {Object} data  {path:string, response: Object, body: string}          
 * @return {Void} 
 */
  function writeData(data) {
    var responseContent = `${data.path}:${data.body}`;
    var filePath;
    var passingTests = runTests(tests, data.body).filter( test => test[1] );
    if( passingTests.length > 0 ){
      filePath = passingTests[0][0]
    }else {
      filePath = path.resolve('validInput.txt')
    }
    fs.appendFile(filePath, responseContent, function(err) {
      if (err) {
        console.log(err);
      }
    });
  };

/**
 * Runs an array of tests on an input. A test should return a boolean value.
 * @param {tupleArray} tuples  [ [string, function] ]         
 * @param {String} input          
 * @return {tupleArray}        [ [string, boolean] ]
 */
  function runTests(tuples, input) {
    return tuples.map( function(tuple) {
      return [tuple[0], tuple[1](input)]
    })
  }
/**
 * Writes to a error file when an exception is found for a given input.
 * @param {Object} error { input:string, message:Object}                  
 * @return {Void} 
 */
  function handleErr(error){
    var errorMessage =  `${error.input}:${error.message} \n`
    var filePath = path.resolve('errors.txt')
      fs.appendFile(filePath, errorMessage, function(err) {
        if (err) {
          console.log(err);
       }    
      });
  };


 exports.requestData = requestData;
 exports.writeData = writeData;
 exports.handleErr = handleErr;
