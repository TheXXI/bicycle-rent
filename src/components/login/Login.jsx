import css from './login.module.scss'
import bicycle from './images/first-bicycle.jpg' 
import { AuthFrom } from './Form/Form';
import { Message } from '../message/Message';


export const Login = () => {
    
    return (
        <div className={css.auth}>
            <div className={css.content}>

                <div className={css.cover}>
                <img src={bicycle} alt="" />
                <h1>Войдите на сайт, чтобы<br/>арендовать ближайший велосипед</h1>
                </div>

                <AuthFrom/>
            </div>
        </div>
    )
}