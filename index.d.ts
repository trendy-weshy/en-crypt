export declare function encrypt<T extends string>(data: T, key: string, algorithm?: string | undefined): string;
export declare function encrypt(data: undefined, key?: string): undefined;
export declare function decrypt<T>(data: string, key: string, algorithm?: string | null): T;
