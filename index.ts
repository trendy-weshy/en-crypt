/**
 * created by waweru
 * LICENSE: MIT
 *
 * #note: simple encryption and decryption library that support typescript and javascript
 */
import {message as funcMessage} from 'tw-crypt';

funcMessage('mike');

export const message: (msg: string) => void = (msg: string): void => {
  console.log(`Message is: ${msg}`);
};
