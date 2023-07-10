import { useDispatch, useSelector } from 'react-redux';
import {signIn, signUp} from '../../../requests/auth'
import css from './form.module.scss'
import { useEffect, useState } from 'react';
import { removeEmailError, removeInvalidPass } from '../../../store/infoMessagesReducer';
import { Input } from '../../shared/FormElements/Input';
import { Button } from '../../shared/Button/Button';

export const From = () => {
    const { emailError, invalidPass } = useSelector(state => state.messagesAndLoader)
    const dispatch = useDispatch()

    const [isRegistrationForm, setIsRegistrationForm] = useState(false);

    const [email, setEmail] = useState('');
    const [emailIsEmpty, setEmailIsEmpty] = useState(false)

    const [password, setPassword] = useState('');
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false)

    const [repeatPassword, setRepeatPassword] = useState('')
    const [repeatPasswordIsEmpty, setRepeatPasswordIsEmpty] = useState(false)
    const [incorrectRepeatPassword, setRepeatIncorrectPassword] = useState('');

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const handleClick = () => {
        if (email === '') setEmailIsEmpty(true);
        if (password === '') setPasswordIsEmpty(true);
        if (isRegistrationForm && repeatPassword === '') setRepeatPasswordIsEmpty(true);

        //dispatch(signIn(email.toLowerCase(), password))

        if (isRegistrationForm && email !== '' && password !== '' && repeatPassword === password) {
            dispatch(signUp(email.toLowerCase(), password, firstname, lastname));
        }
        else if (!isRegistrationForm && email !== '' && password !== '') {
            dispatch(signIn(email.toLowerCase(), password));
        }

        if (isRegistrationForm) setIsRegistrationForm(false);
    }

    return (
        <div className={css.form}>
            <Input
                label={"E-mail"}
                required={true}
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                    setEmailIsEmpty(false)
                    if (emailError) dispatch(removeEmailError())
            }}/>
            <span className="error">
                {emailError ? emailError : ""}
                {emailIsEmpty ? "Обязательное поле" : ""}
            </span>

            <Input
                label={"Пароль"}
                required={true}
                type={"password"}
                value={password}
                onChange={e => {
                    setPassword(e.target.value)
                    setPasswordIsEmpty(false)
                    if (invalidPass) dispatch(removeInvalidPass())
            }}/>
            <span className="error">
                {invalidPass ? "Неверный пароль" : ""}
                {passwordIsEmpty ? "Обязательное поле" : ""}
            </span>

            {isRegistrationForm &&
            <>
                <Input
                    label={"Повторите ароль"}
                    required={true}
                    type={"password"}
                    value={repeatPassword} 
                    onChange={e => {
                        setRepeatPassword(e.target.value)
                        setRepeatPasswordIsEmpty(false)
                        e.target.value !== '' && e.target.value !== password ? setRepeatIncorrectPassword(true) : setRepeatIncorrectPassword(false)
                    }}
                />
                <span className="error">
                    {incorrectRepeatPassword ? "Пароли не совпадают" : ""}
                    {repeatPasswordIsEmpty ? "Обязательное поле" : ""}
                </span>

                <Input 
                    label={"Имя"}
                    type="text"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
                <Input
                    label={"Фамилия"}
                    type="text"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />

            </>
            }

            <Button onClick={() => handleClick()}>{isRegistrationForm ? "Зарегистрироваться" : "Войти"}</Button>
            <button className={css['change-auth-from']} 
                onClick={() => {
                    setEmail('');
                    setPassword('');
                    setRepeatPassword('');
                    setFirstname('');
                    setLastname('');
                    setEmailIsEmpty(false);
                    setPasswordIsEmpty(false);
                    setRepeatPasswordIsEmpty(false);
                    setIsRegistrationForm(!isRegistrationForm);
                }}>
                { isRegistrationForm ? "Вход" : "Регистрация" }
            </button>
        </div>
    )
}