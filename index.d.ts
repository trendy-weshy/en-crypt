export declare class SlowdayCrypt {
    static decrypt<T>(data: string, key: string, algorithm?: string | null): any;
    static encrypt<T>(data: T, key: string, algorithm?: string | null): string;
}
