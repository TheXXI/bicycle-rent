import { useDispatch, useSelector } from 'react-redux';
import {signIn, signUp} from '../../../requests/auth'
import css from './form.module.scss'
import { useEffect, useState } from 'react';
import { removeEmailError, removeInvalidPass } from '../../../store/infoMessagesReducer';

export const From = () => {
    useEffect( () => console.log('rerender Form'))
    const { emailError, invalidPass } = useSelector(state => state.messagesAndLoader)
    const dispatch = useDispatch()

    const [isRegistrationForm, setisRegistrationForm] = useState(false);

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
        if (email === '') setEmailIsEmpty(true)
        if (password === '') setPasswordIsEmpty(true)
        if (isRegistrationForm && repeatPassword === '') setRepeatPasswordIsEmpty(true)

        //dispatch(signIn(email.toLowerCase(), password))

        if (isRegistrationForm && email !== '' && password !== '' && repeatPassword === password) {
            dispatch(signUp(email.toLowerCase(), password, firstname, lastname))
        }
        else if (!isRegistrationForm && email !== '' && password !== '') {
            dispatch(signIn(email.toLowerCase(), password))
        }
    }

    return (
        <div className={css.form}>
            <label><span>E-mail<span className="required">*</span>:</span>
                <input type="email" value={email} onChange={e => {
                    setEmail(e.target.value)
                    setEmailIsEmpty(false)
                    if (emailError) dispatch(removeEmailError())
                    }}/>
            </label>
            <span className="error">
                {emailError ? emailError : ""}
                {emailIsEmpty ? "Обязательное поле" : ""}
                </span>
            <label><span>Пароль<span className="required">*</span>:</span>
                <input type="password" value={password} onChange={e => {
                        setPassword(e.target.value)
                        setPasswordIsEmpty(false)
                        if (invalidPass) dispatch(removeInvalidPass())
                    }}/>
            </label>
            <span className="error">
                {invalidPass ? "Неверный пароль" : ""}
                {passwordIsEmpty ? "Обязательное поле" : ""}
                </span>
            {isRegistrationForm &&
            <>
                <label className={css.label}><span>Повторите пароль<span className="required">*</span>:</span>
                    <input type="password" value={repeatPassword} 
                    onChange={e => {
                        setRepeatPassword(e.target.value)
                        setRepeatPasswordIsEmpty(false)
                        e.target.value !== '' && e.target.value !== password ? setRepeatIncorrectPassword(true) : setRepeatIncorrectPassword(false)
                    }}
                    />
                        <span className="error">
                            {incorrectRepeatPassword ? "Неверный пароль" : ""}
                            {repeatPasswordIsEmpty ? "Обязательное поле" : ""}
                            </span>
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
                    setRepeatPassword('')
                    setFirstname('')
                    setLastname('')
                    setEmailIsEmpty(false)
                    setPasswordIsEmpty(false)
                    setRepeatPasswordIsEmpty(false)
                    setisRegistrationForm(!isRegistrationForm)
                }}>
                { isRegistrationForm ? "Вход" : "Регистрация" }
            </button>
        </div>
    )
}