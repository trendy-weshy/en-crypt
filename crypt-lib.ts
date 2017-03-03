/**
 * created by waweru
 */

import * as crypto from 'crypto';
import * as assert from 'assert';

export namespace jwCrypt{

    export function encrypt<T>(data: T, algorithm: string, key: string): string {
        let data_string: string = JSON.stringify(data); //#note: create a string out of the data structure provided
        let cipher: crypto.Cipher = crypto.createCipher(algorithm, key);
        let digest: string = cipher.update(data_string, 'utf8', 'hex');
        digest += cipher.final('hex');
        return digest;
    }

    export function decrypt<T>(data: string, algorithm: string, key: string): T {
        let decipher: crypto.Decipher = crypto.createDecipher(algorithm, key);
        let digest: string = decipher.update(data, 'hex', 'utf8');
        digest += decipher.final('utf8');
        return JSON.parse(digest); //#note: return the data structure that was encrypted in the first place
    }
}

//#Ingore: this is a simple test for the above code.
interface credentials {
    hash_password: string;
    auth_token: string;
}
let data: credentials = {
    hash_password: `ahashedpasswordisthebest`,
    auth_token: `thisismytoken123`
};
let key: string = `ineedmoney`;
let algorithm: string = `aes-256-ctr`;
let encrypted_data: string = jwCrypt.encrypt<credentials>(data, algorithm, key);
let decrypted_data: credentials = jwCrypt.decrypt<credentials>(encrypted_data, algorithm, key);
//@test: make sure decrypted password is the same as the original
assert.deepStrictEqual({ a: data }, { a: decrypted_data});
//@log: display process
console.log(`
    Original data:- password => ${decrypted_data.hash_password} and auth token => ${decrypted_data.auth_token}\n
    Encrypted data:- ${encrypted_data}\n 
    Decrypted data:- password => ${decrypted_data.hash_password} and auth token => ${decrypted_data.auth_token}\n 
    Completed...
`);
