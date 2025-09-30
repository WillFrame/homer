'use client';
import React, {FC} from 'react';

import {FormValues} from './types';
import Input from '@/components/input';
import styles from './styles.module.css';
import {useForm} from 'react-hook-form';
import Button from '@/components/button';
import axios from 'axios';
import {API_URL} from 'consts/api-url';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '@/features/authorization/slice';
import {RootState} from '@/store';

const Form: FC = () => {
    const {token: currentToken} = useSelector((state: RootState) => state.authorization);
    const dispatch = useDispatch();
    const {handleSubmit, register, formState: {isValid}} = useForm<FormValues>();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axios.post(`${API_URL}/auth/sign_in`, data)
                .then(res => res.data)
                .then(({token}) => dispatch(setToken(token)))
                .catch(err => console.error(err));
        } catch (err) {
            console.error(err);
        }
    });

    return (
        <div className={styles['formWrapper']}>
            <Input placeholder="Логин" {...register('name')} />
            <Input placeholder="Пароль" {...register('password')} />
            <Button onClick={onSubmit} disabled={!isValid}>
                Войти
            </Button>
            {currentToken}
            {/* <User width={100} height={100} /> */}
        </div>
    );
};

export default Form;
