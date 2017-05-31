/**
 * created by waweru
 * LICENSE: MIT
 *
 * #note: simple encryption and decryption library
 */

import * as crypto from 'crypto';

export class TwCrypt {

  public static encrypt<T>(data: T, algorithm: string, key: string): string {
    let data_string: string = JSON.stringify(data); //#note: create a string out of the data structure provided
    let cipher: crypto.Cipher = crypto.createCipher(algorithm, key);
    let digest: string = cipher.update(data_string, 'utf8', 'hex');
    digest += cipher.final('hex');
    return digest;
  }

  public static decrypt<T>(data: string, algorithm: string, key: string): T {
    let decipher: crypto.Decipher = crypto.createDecipher(algorithm, key);
    let digest: string = decipher.update(data, 'hex', 'utf8');
    digest += decipher.final('utf8');
    return JSON.parse(digest); //#note: return the data structure that was encrypted in the first place
  }

}