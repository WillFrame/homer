'use client';
import {ROUTES} from '@/consts/routes';
import cookie from '@/utils/cookie';
import {useRouter} from 'next/navigation';
import {FC, PropsWithChildren, useEffect, useState} from 'react';

export const WithAuthHoc: FC<PropsWithChildren> = ({children}) => {
    const {push} = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!cookie.get('authToken')) {
            push(ROUTES.auth.signIn);
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return 'loading...';
    }

    return children;
};
