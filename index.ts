/**
 * @license MIT
 * created by waweru
 */

import {randomBytes, createCipher, Cipher, createDecipher, Decipher} from 'crypto';
// tslint:disable-next-line:no-var-requires
const random = require('lodash.random');
// tslint:disable-next-line:no-var-requires
const cipherList = require('./en-crypt.json');

/**
 * @param data
 * @param key
 * @param algorithm
 * @return string | undefined
 *
 * function is overloaded for capturing the various implementation of the encryption data needs.
 * This also enables self code-documentation and better definition files .d.ts.
 */
export function encrypt(data: number, key: string, algorithm?: string): string;
export function encrypt<T>(data: T, key: string, algorithm?: string): string;
export function encrypt<T>(data: T|number, key: string, algorithm: string|undefined): string|undefined {
    try {
        if (!data) {
            return undefined;
        }
        const salt: string = randomBytes(4).toString('hex');
        const dummyText: string = randomBytes(3).toString('hex');
        const idx: number = Math.floor(random(cipherList.ciphers.length-2));
        const internalAlg: string = cipherList.ciphers[idx];
        // get a JSON string for easy data consistency
        const dataString: string = JSON.stringify( (typeof data === 'number') ? data.toString() : data );
        const cipher: Cipher = createCipher((algorithm) ? algorithm : internalAlg, `${key}||${salt}`);
        let digest: string = cipher.update(dataString, 'utf8', 'hex');
        digest += cipher.final('hex');
        return `${dummyText}|${(!algorithm) ? idx : 'idx-n'}|${digest};;${salt}`;
    } catch(e) {
        throw e;
    }
}

/**
 * @param data
 * @param key
 * @param algorithm
 * @return generictype<T>
 *
 * decrypt and return a desired output per the generic definition
 */
export function decrypt<T>(data: string, key: string, algorithm: string|null=null): T {
    if (!data) {
        return null;
    }
    const digestData = data.split('|');
    const [dummyText, cipherIdx, cipher] = digestData;
    const digestCipher = cipher.split(';;');
    const [encryptedData, salt] = digestCipher;
    algorithm=(cipherIdx==='idx-n') ? algorithm : cipherList.ciphers[cipherIdx]; // determine which algorithm to use

    try {
        const decipher: Decipher = createDecipher(algorithm, `${key}||${salt}`);
        let digest: string = decipher.update(encryptedData, 'hex', 'utf8');
        digest += decipher.final('utf8');
        return JSON.parse(digest);
    } catch (e) {
        throw e;
    }
}
