/**
 * @license MIT
 * created by waweru
 */

export default class Encrypt<T> {
    
    public static inst;

    public static init<G>() {
        if (!Encrypt.inst) {
          Encrypt.inst = new Encrypt<G>();
        }
        return Encrypt.inst;
    }

    private constructor() {}

    private cipher(data: T, algorithm: string, key: string): string {
        return '';
    }

    private decipher(data: string, algorithm: string, key: string): T {
        return {} as T;
    }
}