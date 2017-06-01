/**
 * @license MIT
 * created by waweru
 */

import {randomBytes, createCipher, Cipher, createDecipher, Decipher} from 'crypto';

// tslint:disable-next-line:no-var-requires
const cipherList = require('./en_crypt.json');

interface IAlgorithm {
    idx: number;
    data: string;
}

export class SlowdayCrypt {

    public static decrypt<T>(data: string, key: string, algorithm: string|null=null) {
        const digestData = data.split('|');
        const [dummyText, cipherIdx, cipher] = digestData;
        const digestCipher = cipher.split(';;');
        const [encryptedData, salt] = digestCipher;
        if (cipherIdx==='idx-n' || !algorithm) {
            throw new Error('Sorry but you need to provide an algorithm for the decryption process to complete');
        } else {
            const decipher: Decipher = createDecipher((algorithm) ? algorithm : cipherList[cipherIdx], `${key}${salt}`);
            let digest: string = decipher.update(encryptedData, 'hex', 'utf8');
            digest += decipher.final('utf8');
            return JSON.parse(digest);
        }
    }

    public static encrypt<T>(data: T, key: string, algorithm: string|null=null): string {
        const salt: string = randomBytes(4).toString('hex');
        const dummyText: string = randomBytes(5).toString('hex');
        let idx: number|null=null;
        if (!algorithm) {
            // tslint:disable-next-line:max-line-length
            idx=Math.floor(Math.random() * (cipherList.length-1)) + 0;
            algorithm=cipherList[idx];
        }

        const dataString: string = JSON.stringify(data);
        const cipher: Cipher = createCipher(algorithm, `${key}${salt}`);
        let digest: string = cipher.update(dataString, 'utf8', 'hex');
        digest += cipher.final('hex');
        return `${dummyText}|${(idx) ? idx : 'idx-n'}|${digest};;${salt}`;
    }

}
