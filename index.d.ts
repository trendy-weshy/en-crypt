export declare function encrypt<T>(data: T, key: string, algorithm?: string | undefined): string;
export declare function encrypt(data: undefined, key?: string): undefined;
export declare function decrypt<T>(data: string, key: string, algorithm?: string | null): T;
