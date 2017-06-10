export declare function encrypt(data: number, key: string, algorithm?: string): string;
export declare function encrypt<T>(data: T, key: string, algorithm?: string): string;
export declare function decrypt<T>(data: string, key: string, algorithm?: string | null): T;
