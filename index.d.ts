export declare function encrypt<T>(data: T | number, key: string, algorithm?: string | undefined): string | undefined;
export declare function decrypt<T>(data: string, key: string, algorithm?: string | null): T;
