import css from './header.module.scss';
import { Link } from "react-router-dom"
import { Navigation } from './Nafigation';
import { useSelector } from 'react-redux';
import { IconBurger } from './icons/Burger';
import { IconOpenBurger } from './icons/OpenBurger';
import { useState } from 'react';
import { Profile } from './Profile';

function getLocalsStorage() {
    const data = JSON.parse(localStorage.getItem('user'));
    return data ? data : {};
}

/*const isEntered () => {
    const user = useSelector(state => state.user.user)
}*/

export const Header = () => {
    const user = useSelector(state => state.user.user)
    
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
    
    return (
        <>
        <header className={css.header}>
            <h1>Прокат <span>велосипедов</span></h1>

            <Navigation/>          
            {/*<Link to="/" className={css['lobin-button']}>Вход</Link>*/}

            {user ?
                <Profile user={user.info} />
            : <Link to="/" className={css['lobin-button']}>Вход</Link>}

            

            <div className={css.burger} onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}>
                {isOpenMobileMenu ? <IconOpenBurger/> : <IconBurger/>}
            </div>
        </header>
        {isOpenMobileMenu &&
            <div className={css['mobile-menu']}>
                <Navigation closeMenu={setIsOpenMobileMenu}/>
                {/*<Link to="/" onClick={() => setIsOpenMobileMenu(false)} className={css['lobin-button']}>Вход</Link>*/}
                <span className={css.login}>
                            { user.info.firstname && user.info.lastname ? user.info.firstname + " " + user.info.lastname[0] + "." : user.info.email }
                </span> | <button className={css['exit-button']}>Выйти</button>
            </div>}
        </>
    )
}