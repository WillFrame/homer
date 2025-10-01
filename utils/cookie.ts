'use client';

import {MILLISECONDS_IN_YEAR} from '@/consts/time-constants';

export interface CookieOptions {
    expires?: Date | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    httpOnly?: boolean;
}

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
    expires: MILLISECONDS_IN_YEAR,
    httpOnly: false,
    path: '/',
    secure: false, // only dev false
    sameSite: 'lax',
};

export interface ICookieManager {
    get(name: string): string | undefined;
    set(name: string, value: string, options?: CookieOptions): void;
    delete(name: string, options?: {path: string, domain?: string}): void;
    getAll(): Record<string, string>;
    has(name: string): boolean;
}

export class CookieManager implements ICookieManager {
    get(name: string): string | null {
        return this.getAll()[name];
    }

    set(
        name: string,
        value: string,
        {
            expires = DEFAULT_COOKIE_OPTIONS.expires,
            path = DEFAULT_COOKIE_OPTIONS.path,
            domain = DEFAULT_COOKIE_OPTIONS.domain,
            secure = DEFAULT_COOKIE_OPTIONS.secure,
            sameSite = DEFAULT_COOKIE_OPTIONS.sameSite,
            httpOnly = DEFAULT_COOKIE_OPTIONS.httpOnly,
        }: CookieOptions = DEFAULT_COOKIE_OPTIONS,
    ): void {
        const cookieArr = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

        if (expires) {
            if (expires instanceof Date) {
                cookieArr.push(`expires=${expires.toUTCString()}`);
            } else {
                cookieArr.push(`max-age=${expires}`);
            }
        }

        if (path) {
            cookieArr.push(`path=${path}`);
        }
        if (domain) {
            cookieArr.push(`domain=${domain}`);
        }
        if (secure) {
            cookieArr.push('secure');
        }
        if (sameSite) {
            cookieArr.push(`samesite=${sameSite}`);
        }
        if (httpOnly) {
            cookieArr.push('httponly');
        }

        document.cookie = cookieArr.join('; ');
    }

    delete(name: string, options: {path: string, domain?: string}): void {
        this.set(name, '', {
            expires: new Date(0),
            path: options.path,
            domain: options.domain,
        });
    }

    getAll(): Record<string, string> {
        return document.cookie
            .split(';')
            .reduce<Record<string, string>>((acc, cookieItem) => {
                const [name, value] = cookieItem.trim().split('=');

                if (name && value) {
                    return {
                        ...acc,
                        [decodeURIComponent(name)]: decodeURIComponent(value),
                    };
                }

                return acc;
            }, {});
    }

    has(name: string): boolean {
        return this.get(name) !== null;
    }

    /**
     * Get number cookie
     */
    getNumber(name: string): number | undefined {
        const value = this.get(name);
        return value ? Number(value) : undefined;
    }

    /**
     * Get boolean cookie
     */
    getBoolean(name: string): boolean | undefined {
        const value = this.get(name);
        return value ? value === 'true' : undefined;
    }
}

/**
 * Only client side
 */
const cookie = new CookieManager();
export default cookie;
