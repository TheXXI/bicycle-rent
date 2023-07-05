import css from './header.module.scss';
import { Link } from "react-router-dom"
import { Navigation } from './Nafigation';
import { useSelector, useDispatch } from 'react-redux';
import { IconBurger } from '../../assets/icons/Burger';
import { IconOpenBurger } from '../../assets/icons/OpenBurger';
import { useState } from 'react';
import { Profile } from './Profile';
import { removeUser } from '../../../store/userReducer';

/*const isEntered () => {
    const user = useSelector(state => state.user.user)
}*/

export const Header = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
    
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
                            dispatch(removeUser());
                            localStorage.clear();
                        }}>Выйти</button>
                </>:
                <Link to="/" onClick={() => setIsOpenMobileMenu(false)} className={css['lobin-button']}>Вход</Link>}
                
            </div>}
        </>
    )
}