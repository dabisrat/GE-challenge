 
 /**
 * determines if an input is a valid password
 * @param {String} password
 * @return {boolean} 
 */
function isPassword(password) {
  password = password.replace('\n', '')
  const re = /^[a-z0-9]+$/
  return  password.length === 8 && re.test(password)
}
  
 /**
 * determines if an input is a Private Key
 * @param {String} key
 * @return {boolean} 
 */
function isPrivateKey(key) {
    return key.includes('BEGIN RSA PRIVATE KEY') && key.includes('END RSA PRIVATE KEY')
}

// exports an array of tuples containing a path to write to and the test function
module.exports = [ ['password.txt',isPassword], ['privateKey.txt',isPrivateKey] ]