import { useDispatch, useSelector } from 'react-redux';
import {signIn, signUp} from '../../../requests/authorization'
import css from './form.module.scss'
import { useState } from 'react';
import { removeMessageUnknownUser, removeMessageInvalidPass } from '../../../store/infoMessagesReducer';

export const AuthFrom = () => {
    const { unknownUser, invalidPass } = useSelector(state => state.messages)
    const dispatch = useDispatch()

    const [isRegistrationForm, setisRegistrationForm] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('')
    const [incorrectRepeatPassword, setRepeatIncorrectPassword] = useState('');

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const handleClick = () => {

        /*isRegistrationForm ? signUp(email.toLowerCase(), password, firstname, lastname, setIncorrectEmail, setIncorrectPassword)
        : signIn(email.toLowerCase(), password, setIncorrectEmail, setIncorrectPassword);*/

        dispatch(signIn(email.toLowerCase(), password))
    }

    return (
        <div className={css.form}>
            <label><span>E-mail<span className={css.required}>*</span>:</span>
                <input type="text" value={email} onChange={e => {
                    setEmail(e.target.value)
                    if (unknownUser) dispatch(removeMessageUnknownUser())
                    }}/>
            </label>
            <span className={css.error}>{unknownUser ? "Неверный логин" : ""}</span>
            <label><span>Пароль<span className={css.required}>*</span>:</span>
                <input type="password" value={password} onChange={e => {
                        setPassword(e.target.value)
                        if (invalidPass) dispatch(removeMessageInvalidPass())
                    }}/>
            </label>
            <span className={css.error}>{invalidPass ? "Неверный пароль" : ""}</span>
            {isRegistrationForm &&
            <>
                <label className={css.label}><span>Повторите пароль<span className={css.required}>*</span>:</span>
                    <input type="password" value={repeatPassword} 
                    onChange={e => {
                        setRepeatPassword(e.target.value)
                        e.target.value !== '' && e.target.value !== password ? setRepeatIncorrectPassword(true) : setRepeatIncorrectPassword(false)
                    }}
                    />
                        <span className={css.error}>{incorrectRepeatPassword ? "Неверный пароль" : ""}</span>
                </label>
                <label>Имя:
                    <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)}/>
                </label>
                <label>Фамилия:
                    <input type="text" value={lastname} onChange={e => setLastname(e.target.value)}/>
                </label>
            </>
            }

            <input type="submit"
            value={
                isRegistrationForm ? "Зарегистрироваться" : "Войти"
            }
            onClick={() => handleClick()}
            /*onClick={
                !isRegistrationForm ?
                    () => signIn(email.toLowerCase(), password) : /*() => {
                        console.log(email.toLowerCase(), password, firstname, lastname)
                        signUp(email.toLowerCase(), password, firstname, lastname)*/
                        /*null*/
                    /*}
            }*/
            className={css.submit}/>
            <button className={css['change-auth-from']} 
                onClick={() => {
                    // setIncorrectEmail(false)
                    // setIncorrectPassword(false)
                    setEmail('');
                    setPassword('');
                    setisRegistrationForm(!isRegistrationForm)
                }}>
                { isRegistrationForm ? "Вход" : "Регистрация" }
            </button>
        </div>
    )
}