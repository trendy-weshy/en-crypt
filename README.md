# en-crypt #
simple encryption-decryption library.

[![Build Status](https://travis-ci.org/slowday/en-crypt.svg?branch=master)](https://travis-ci.org/slowday/en-crypt)

## How to install ##
For those who are interested in contributing to the project

**Dependencies**
- Must have node.js version 6 and above
- Must have typescript version 2.0 and above installed globally
* Then just `npm install` or `yarn install`

## Usage ##
1. Open terminal
2. Install the package in you node.js project via `npm install @slowday/en-crypt`
3. Import the module the following ways:
    **For ES6 and TypeScript**

    import {encrypt, decrypt} from '@slowday/en-crypt';
    // OR
    // import * as crypto from '@slowday/en-crypt';
    // FOR TypeScript ONLY
    // import crypto = require('@slowday/en-crypt');

    **For ES5**

    var crypto = require('@slowday/en-crypt');
    // OR
    // var encrypt = require('@slowday/en-crypt'); // this to just have one functionality imported

4. How to use:
    **For TypeScript**

    import {encrypt, decrypt} from '@slowday/en-crypt';
    import {deepStrictEqual} from 'assert';

    try {
        const data: ICredentials = {
            authToken: `thisismytoken123`,
            hashPassword: `ahashedpasswordisthebest`
        };
        const key: string = randomBytes(8).toString('hex');
        const encrypted: string = encrypt<ICredentials>(data, key);
        const decrypted: any = decrypt<ICredentials>(encrypted, key);
        deepStrictEqual({ a: data }, { a: decrypted });
    } catch(e) {
        throw e;
    }

    **For ES6**

    import {encrypt, decrypt} from '@slowday/en-crypt';
    import {deepStrictEqual} from 'assert';

    try {
        const data = {
            authToken: `thisismytoken123`,
            hashPassword: `ahashedpasswordisthebest`
        };
        const key = randomBytes(8).toString('hex');
        const encrypted = encrypt(data, key);
        const decrypted = decrypt(encrypted, key);
        deepStrictEqual({ a: data }, { a: decrypted });
    } catch(e) {
        throw e;
    }

    **For ES5**

    var crypto = require('@slowday/en-crypt');
    try {
        var data = {
            authToken: `thisismytoken123`,
            hashPassword: `ahashedpasswordisthebest`
        };
        var key = randomBytes(8).toString('hex');
        var encrypted = encrypt(data, key);
        var decrypted = decrypt(encrypted, key);
        console.log(encrypted, decrypted);
    } catch(e) {
        throw e;
    }

## LICENSE ##
MIT

## Author ##
John Waweru, All rights reserved
