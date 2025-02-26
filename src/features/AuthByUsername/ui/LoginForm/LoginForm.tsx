import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import {getLoginUsername} from "../../model/selectors/getLoginUsername/getLoginUsername";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {getLoginLoading} from "../../model/selectors/getLoginLoading/getLoginLoading";
import {getLoginPassword} from "../../model/selectors/getLoginPassword/getLoginPassword";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}
const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const loginForm = useSelector(getLoginState);


    const username = useSelector(getLoginUsername)
    const error = useSelector(getLoginError)
    const isLoading = useSelector(getLoginLoading)
    const password = useSelector(getLoginPassword)



    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback( (value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if(result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }

    }, [dispatch, password, username]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text text={error} theme={TextTheme.ERROR} />
                )}
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите username')}
                    onChange={onChangeUsername}
                    value={username}
                    autofocus
                />
                <Input
                    type="text"
                    className={cls.input}
                    onChange={onChangePassword}
                    value={password}
                    placeholder={t('Введите пароль')}
                />

                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.LoginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>

    );
});

export default LoginForm;
