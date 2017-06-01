export declare class SlowdayCrypt {
    static decrypt<T>(data: string, key: number, algorithm?: string | null): any;
    static encrypt<T>(data: T, key: string, algorithm?: string | null): string;
}
