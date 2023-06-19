import css from './authForm.module.scss'
import { useState } from 'react';

export const AuthFrom = () => {
    const [isRegistrationShown, setIsRegistrationShown] = useState(false);
    return (
        <div className={css.form}>
            <label>Логин:
                <input type="text" />
            </label>
            <label>Пароль:
                <input type="password" />
            </label>

            {isRegistrationShown &&
            <>
                <label>Повторите пароль:
                    <input type="password" />
                </label>
                <label>Имя:
                    <input type="text" />
                </label>
                <label>Фамилия:
                    <input type="text" />
                </label>
            </>
            }

            <input type="submit" value={
                isRegistrationShown ? "Зарегистрироваться" : "Войти"
            } className={css.submit}/>
            <button className={css['change-auth-from']} 
                onClick={() => setIsRegistrationShown(!isRegistrationShown)}
            >
                { isRegistrationShown ? "Вход" : "Регистрация" }
            </button>
        </div>
    )
}