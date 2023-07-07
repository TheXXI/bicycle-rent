import { useDispatch, useSelector } from 'react-redux';
import css from './header.module.scss'
import { IconProfile } from '../../assets/icons/Profile';
import { removeUser } from '../../../store/userReducer';
import { Link, useNavigate } from "react-router-dom"

export const Profile = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                            navigate('/');
                            dispatch(removeUser())
                            localStorage.clear();
                        }}>Выйти</button>
            </div>
            <IconProfile/>
        </div> :
        <div className={css['profile-button']}>
            <Link to="/" className={css['login-button']}>Вход</Link>
        </div>
        }
        </>
    )
}

/*

{user ? 
            <Profile /> :
            <Link to="/" className={css['lobin-button']}>Вход</Link>
            }*/