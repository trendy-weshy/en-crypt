/**
 * created by waweru
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var assert = require("assert");
var jwCrypt;
(function (jwCrypt) {
    function encrypt(data, algorithm, key) {
        var data_string = JSON.stringify(data);
        var cipher = crypto.createCipher(algorithm, key);
        var digest = cipher.update(data_string, 'utf8', 'hex');
        digest += cipher.final('hex');
        return digest;
    }
    jwCrypt.encrypt = encrypt;
    function decrypt(data, algorithm, key) {
        var decipher = crypto.createDecipher(algorithm, key);
        var digest = decipher.update(data, 'hex', 'utf8');
        digest += decipher.final('utf8');
        return JSON.parse(digest);
    }
    jwCrypt.decrypt = decrypt;
})(jwCrypt = exports.jwCrypt || (exports.jwCrypt = {}));
//@test: see if above functions work
var password = "metoyourpassword";
var key = "ineedmoney";
var algorithm = "aes-256-ctr";
var encryptedPassword = jwCrypt.encrypt(password, algorithm, key);
var decryptedPassword = jwCrypt.decrypt(encryptedPassword, algorithm, key);
//@test: make sure decrypted password is the same as the original
assert.deepStrictEqual({ a: password }, { a: decryptedPassword });
//@log: display process
console.log("\n    Original data: " + password + "\n\n    Encrypted data: " + encryptedPassword + "\n \n    Decrypted data: " + decryptedPassword + "\n \n    Completed...\n");
