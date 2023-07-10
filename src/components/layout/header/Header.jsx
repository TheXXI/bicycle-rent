import css from './header.module.scss';
import { Link, useNavigate } from "react-router-dom"
import { Navigation } from './Nafigation';
import { useSelector, useDispatch } from 'react-redux';
import { IconBurger } from '../../assets/icons/Burger';
import { IconOpenBurger } from '../../assets/icons/OpenBurger';
import { useState } from 'react';
import { Profile } from './Profile';
import { removeUser } from '../../../store/userReducer';

export const Header = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    
    return (
        <>
        <header className={css.header}>
            <h1>Прокат <span>велосипедов</span></h1>

            <Navigation />

            <Profile /> 

            <div className={css.burger} onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}>
                {isOpenMobileMenu ? <IconOpenBurger/> : <IconBurger/>}
            </div>
        </header>
        {isOpenMobileMenu &&
            <div className={css['mobile-menu']}>
                <Navigation closeMenu={setIsOpenMobileMenu}/>
                {user ?
                <>
                    <span className={css.login}>
                        { user.info.firstname && user.info.lastname ? user.info.firstname + " " + user.info.lastname[0] + "." : user.info.email }
                    </span> | <button className={css['exit-button']} onClick={
                        () => {
                            navigate('/');
                            dispatch(removeUser());
                            localStorage.clear();
                            setIsOpenMobileMenu(false);
                        }}>Выйти</button>
                </>:
                <Link to="/" className={css['login-button']} onClick={() => setIsOpenMobileMenu(false)}>Вход</Link> }
            </div>}
        </>
    )
}