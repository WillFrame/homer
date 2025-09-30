import React from 'react';

import {Component} from './types';
import Theme from './components/theme';
import ReduxProvider from './components/redux';

const PageProvider: Component = ({children}) => (
    <Theme>
        <ReduxProvider>
            {children}
        </ReduxProvider>
    </Theme>
);

export default PageProvider;
