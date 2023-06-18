import { Link } from 'react-router-dom'
import css from './auth.module.scss'
import bicycle from './images/first-bicycle.jpg' 

export const Auth = () => {
    return (
        <div className={css.auth}>
            <div className={css.content}>

                <div className={css.cover}>
                <img src={bicycle} alt="" />
                <h1>Войдите на сайт, чтобы<br/>арендовать ближайший велосипед</h1>
                </div>

                <div className={css.form}>
                    <label>Логин:
                        <input type="text" />
                    </label>
                    <label>Пароль:
                        <input type="password" />
                    </label>
                    <input type="submit" value="Войти" className={css.submit}/>
                    <Link to="/registration" className={css.registration}>Регистрация</Link>
                </div>
            </div>
        </div>
    )
}