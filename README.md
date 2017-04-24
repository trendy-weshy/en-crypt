# tw-crypt
[ ![Codeship Status for trendy-weshy/tw-crypt](https://app.codeship.com/projects/5e75cd50-0b00-0135-a5b3-26d8edc808d8/status?branch=master)](https://app.codeship.com/projects/214846)

> simple encryption decryption library that uses node.js crypto library.

## How to install
For those who are interested in contributing to the
**Dependencies are:**
- Must have node.js version 6 and above
- Must have typescript version 2.0 and above installed globally
* Then just npm install

## Documentation
The whole library is a static class with two methods `encrypt` and `decrypt`

- `static encrypt<T>(data: T, algorithm: string, key: string) => string`
- `static decrypt<T>(data: string/* the encrypted string*/, algorithm: string, key: string) => T`

** please check the test folder for better example on how to use the library **

## LICENSE
MIT
