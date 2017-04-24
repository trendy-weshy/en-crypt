/**
 * created by waweru
 * LICENSE: MIT
 */

declare module 'tw-crypt' {
  export class TwCrypt {
    public static encrypt<T>(data: T, algorithm: string, key: string): string;
    public static decrypt<T>(data: string, algorithm: string, key: string): T;   
  }
}
