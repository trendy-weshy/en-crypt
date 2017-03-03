/**
 * created by waweru
 */

import * as crypto from 'crypto';
import * as assert from 'assert';

export namespace jwCrypt{

    export function encrypt<T>(data: T, algorithm: string, key: string): string {
        let data_string: string = JSON.stringify(data); 
        let cipher = crypto.createCipher(algorithm, key);
        let digest = cipher.update(data_string, 'utf8', 'hex');
        digest += cipher.final('hex');
        return digest;
    }

    export function decrypt<T>(data: string, algorithm: string, key: string): T | string {
        let decipher = crypto.createDecipher(algorithm, key);
        let digest = decipher.update(data, 'hex', 'utf8');
        digest += decipher.final('utf8');
        return JSON.parse(digest);
    }
}

//#Ingore: this is a simple test for the above code.
let password: string = `metoyourpassword`;
let key: string = `ineedmoney`;
let algorithm: string = `aes-256-ctr`;
let encryptedPassword: string = jwCrypt.encrypt<string>(password, algorithm, key);
let decryptedPassword: string = jwCrypt.decrypt<string>(encryptedPassword, algorithm, key);
//@test: make sure decrypted password is the same as the original
assert.deepStrictEqual({a:password}, {a:decryptedPassword});
//@log: display process
console.log(`
    Original data: ${password}\n
    Encrypted data: ${encryptedPassword}\n 
    Decrypted data: ${decryptedPassword}\n 
    Completed...
`);
