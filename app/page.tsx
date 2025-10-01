import {WithAuthHoc} from '@/lib/hocs/auth-hoc';
import React from 'react';

const Page = () => {
    return (
        <WithAuthHoc>
            <h1>
                content page
            </h1>
        </WithAuthHoc>
    );
};

export default Page;
