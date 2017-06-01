/**
 * @license MIT
 * created by waweru
 */

import {randomBytes} from 'crypto';
import {SlowdayCrypt} from '../index';
// tslint:disable-next-line:no-var-requires
const isEqual = require('lodash.isequal');
import {deepStrictEqual, equal, notEqual} from 'assert';

describe('SlowdayEncrypt class module', () => {
    interface ICredentials {
        hashPassword: string;
        authToken: string;
    }
    const dataList: any[] = [
        'iam_a_peaceful_person_getting_through_life_peacefully',
        {name: 'James', gender: 'male', age: '21', bio: 'simple kid with nothing to hide. A nobody.'},
        901208823742213,
        'I_mix_numbers-with-1238197231_and_add-few-signs-$$%^',
        JSON.stringify({name: 'James', gender: 'male', age: '21', bio: 2891728193271846917, mean: '(*&^%$#@#$%^&*())'}),
        [
            {name: 'James', gender: 'male'},
            {name: 'Rachel', gender: 'female'},
            {name: 'Belle', gender: 'female'},
            {name: 'Don', gender: 'male'}
        ]
    ];
    const keys = [
        randomBytes(6).toString('hex'),
        randomBytes(4).toString('hex'),
        randomBytes(8).toString('hex'),
        randomBytes(10).toString('hex')
    ];
    const emitRandomIdx = (n: number) => (Math.floor(Math.random() * (n-1)+0));

    it('Should accept an user-chosen algorithm as an argument', (done: MochaDone) => {
        try {
            const data: ICredentials = {
                authToken: `thisismytoken123`,
                hashPassword: `ahashedpasswordisthebest`
            };
            const key: string = randomBytes(8).toString('hex');
            const algorithm: string = `aes-256-ctr`;
            const encrypted: string = SlowdayCrypt.encrypt<any>(data, key, algorithm);
            const decrypted: any = SlowdayCrypt.decrypt<any>(encrypted, key, algorithm);
            deepStrictEqual({ a: data }, { a: decrypted });
        } catch(e) {
            equal(e, undefined || null);
        }
        done();
    });

    it('Should output segmented encrypted data', (done: MochaDone) => {
        const data: string = 'ineedmoremoney_up_in_here!';
        const key: string = randomBytes(8).toString('hex');
        try {
            const encrypted: string = SlowdayCrypt.encrypt<any>(data, key);
            const digestData = encrypted.split('|');
            equal(digestData.length, 3);
            const [dummyText, cipherIdx, cipher] = digestData;
            const digestCipher = cipher.split(';;');
            equal(digestCipher.length, 2);
        } catch(e) {
            equal(e, undefined || null);
        }
        done();
    });

    context('Library adoption to diffrent data types', () => {
        it('Should encrypt-decrypt a random list of data', (done: MochaDone) => {
            try {
                const key: string = keys[emitRandomIdx(keys.length)];
                const result: boolean = dataList.reduce((acc: boolean, curr: any) => {
                    const encrypted: string = SlowdayCrypt.encrypt<any>(curr, key, null);
                    const decrypted: any = SlowdayCrypt.decrypt<any>(encrypted, key, null);
                    deepStrictEqual({ a: curr }, { a: (typeof curr === 'number') ? parseInt(decrypted) : decrypted });
                    return isEqual(curr, decrypted);
                }, 0);
            } catch(e) {
                equal(e, undefined || null);
            }
            done();
        });
    });
});
