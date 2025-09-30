'use client';
import {Component} from './types';
import {Provider} from 'react-redux';
import {store} from 'store';

const ReduxProvider: Component = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default ReduxProvider;
