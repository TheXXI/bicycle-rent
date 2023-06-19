import css from './header.module.scss';
import { Link } from "react-router-dom"
import { IconBurger } from './icons/Burger';
import { IconOpenBurger } from './icons/OpenBurger';
import { useState } from 'react';

const Navigation = (props) => {
    const hideMobile = () => props.closeMenu(false)
    return (
        <nav className={css.navigation}>
            <ul>
                <li><Link onClick={hideMobile} to="/">Главная</Link></li>
                <li><Link onClick={hideMobile} to="/prices">Тарифы</Link></li>
                <li><Link onClick={hideMobile} to="/report">Сообщить о краже</Link></li>
                <li><Link onClick={hideMobile} to="/allreports">Все кражи</Link></li>
                <li><Link onClick={hideMobile} to="/staff">Сотрудники</Link></li>
            </ul>
        </nav> 
    )
}

export const Header = () => {
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
    return (
        <>
        <header className={css.header}>
            <h1>Прокат <span>велосипедов</span></h1>

            <Navigation/>          
            <Link to="/" className={css.login}>Вход</Link>

            <div className={css.burger} onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}>
                {isOpenMobileMenu ? <IconOpenBurger/> : <IconBurger/>}
            </div>
        </header>
        {isOpenMobileMenu &&
            <div className={css['mobile-menu']}>
                <Navigation closeMenu={setIsOpenMobileMenu}/>
                <Link to="/" onClick={() => setIsOpenMobileMenu(false)} className={css.login}>Вход</Link>
            </div>}
        </>
    )
}