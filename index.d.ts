export declare class SlowdayCrypt {
    static decrypt<T>(data: string, key: number): void;
    static encrypt<T>(data: T, key: string, algorithm?: string | null): string;
}
