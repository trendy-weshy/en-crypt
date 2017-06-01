/**
 * @license MIT
 * created by waweru
 */

import {randomBytes, createCipher, Cipher, createDecipher, Decipher} from 'crypto';
// tslint:disable-next-line:no-var-requires
const random = require('lodash.random');
// tslint:disable-next-line:no-var-requires
const cipherList = require('./en-crypt.json');

interface IAlgorithm {
    idx: number;
    data: string;
}

export class SlowdayCrypt {

    public static decrypt<T>(data: string, key: string, algorithm: string|null=null): T {
        const digestData = data.split('|');
        const [dummyText, cipherIdx, cipher] = digestData;
        const digestCipher = cipher.split(';;');
        const [encryptedData, salt] = digestCipher;
        // #note: determine which algorithm to use;
        algorithm=(cipherIdx==='idx-n') ? algorithm : cipherList.ciphers[cipherIdx];

        try {
            const decipher: Decipher = createDecipher(algorithm, `${key}||${salt}`);
            let digest: string = decipher.update(encryptedData, 'hex', 'utf8');
            digest += decipher.final('utf8');
            return JSON.parse(digest);
        } catch (e) {
            throw e;
        }
    }

    public static encrypt<T>(data: T | number | string, key: string, algorithm: string|null=null): string {
        try {
            if (typeof data==='number') {
                data=data.toString();
            }
            const salt: string = randomBytes(4).toString('hex');
            const dummyText: string = randomBytes(3).toString('hex');
            const idx: number|null=Math.floor(random(cipherList.ciphers.length-2));
            const internalAlg: string = cipherList.ciphers[idx];
            const dataString: string = JSON.stringify(data);
            const cipher: Cipher = createCipher((algorithm) ? algorithm : internalAlg, `${key}||${salt}`);
            let digest: string = cipher.update(dataString, 'utf8', 'hex');
            digest += cipher.final('hex');
            return `${dummyText}|${(!algorithm) ? idx : 'idx-n'}|${digest};;${salt}`;
        } catch(e) {
            throw e;
        }
    }

}
