import { useDispatch, useSelector } from 'react-redux';
import css from './header.module.scss'
import { IconProfile } from '../assets/icons/Profile';
import { removeUser } from '../../store/userReducer';
import { Link } from "react-router-dom"

export const Profile = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    return (
        <>
        {user ?
        <div className={css.profile}>
            <div className={css['text-elements']}>
                <span className={css.login}>
                    { user.info.firstname && user.info.lastname ? user.info.firstname + " " + user.info.lastname[0] + "." : user.info.email }
                </span>
                <button className={css['exit-button']} onClick={
                        () => {
                            dispatch(removeUser())
                            localStorage.clear();
                        }}>Выйти</button>
            </div>
            <IconProfile/>
        </div> :
        <Link to="/" className={css['lobin-button']}>Вход</Link> }
        </>
    )
}

/*

{user ? 
            <Profile /> :
            <Link to="/" className={css['lobin-button']}>Вход</Link>
            }*/