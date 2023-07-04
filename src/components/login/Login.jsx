import css from './login.module.scss'
import bicycle from '../assets/images/first-bicycle.jpg' 
import { From } from './Form/Form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {  
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate() 
    useEffect(() => {
        if (user) {
            navigate('/cases');
        }
    })
    
    return (
        <div className={css.login}>
            <div className={css.content}>

                <div className={css.cover}>
                <img src={bicycle} alt="" />
                <h1>Войдите на сайт, чтобы<br/>арендовать ближайший велосипед</h1>
                </div>

                <From/>
            </div>
        </div>
    )
}