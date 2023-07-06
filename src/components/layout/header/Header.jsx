import css from './header.module.scss';
import { useNavigate } from "react-router-dom"
import { Navigation } from './Nafigation';
import { useSelector, useDispatch } from 'react-redux';
import { IconBurger } from '../../assets/icons/Burger';
import { IconOpenBurger } from '../../assets/icons/OpenBurger';
import { useState } from 'react';
import { Profile } from './Profile';
import { removeUser } from '../../../store/userReducer';
import { Button } from '../../shared/Button/Button';

/*const isEntered () => {
    const user = useSelector(state => state.user.user)
}*/

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
                            dispatch(removeUser());
                            localStorage.clear();
                        }}>Выйти</button>
                </>:
                <Button onClick={() => {
                    navigate('/');
                    setIsOpenMobileMenu(false);
                }}>Войти</Button>}
            </div>}
        </>
    )
}