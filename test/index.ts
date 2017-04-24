/**
 * created by waweru
 * #note: testing encryption and decryption library
 * LICENSE: MIT
 */

import * as assert from 'assert';
import {TwCrypt} from '../index';

interface ICredentials {
    hash_password: string;
    auth_token: string;
}


describe('TwCrypt Test Suite', function() {
  
  it('Should encrypt and decrypt an object', (done: any) => {

    let data: ICredentials = {
      hash_password: `ahashedpasswordisthebest`,
      auth_token: `thisismytoken123`
    };
    
    let key: string = `ineedmoney`;
    let algorithm: string = `aes-256-ctr`;

    let encrypted_data: string = TwCrypt.encrypt<ICredentials>(data, algorithm, key);
    let decrypted_data: ICredentials = TwCrypt.decrypt<ICredentials>(encrypted_data, algorithm, key);

    assert.deepStrictEqual({ a: data }, { a: decrypted_data});
    return done();

  });

});