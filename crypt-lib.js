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
        var data_string = JSON.stringify(data); //#note: create a string out of the data structure provided
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
        return JSON.parse(digest); //#note: return the data structure that was encrypted in the first place
    }
    jwCrypt.decrypt = decrypt;
})(jwCrypt = exports.jwCrypt || (exports.jwCrypt = {}));
var data = {
    hash_password: "ahashedpasswordisthebest",
    auth_token: "thisismytoken123"
};
var key = "ineedmoney";
var algorithm = "aes-256-ctr";
var encrypted_data = jwCrypt.encrypt(data, algorithm, key);
var decrypted_data = jwCrypt.decrypt(encrypted_data, algorithm, key);
//@test: make sure decrypted password is the same as the original
assert.deepStrictEqual({ a: data }, { a: decrypted_data });
//@log: display process
console.log("\n    Original data:- password => " + decrypted_data.hash_password + " and auth token => " + decrypted_data.auth_token + "\n\n    Encrypted data:- " + encrypted_data + "\n \n    Decrypted data:- password => " + decrypted_data.hash_password + " and auth token => " + decrypted_data.auth_token + "\n \n    Completed...\n");
