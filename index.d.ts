export declare class SlowdayCrypt {
    static decrypt<T>(data: string, key: string, algorithm?: string | null): T;
    static encrypt<T>(data: T | number | string, key: string, algorithm?: string | null): string;
}
