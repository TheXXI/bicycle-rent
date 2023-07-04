import { Link } from "react-router-dom"
import css from './header.module.scss'
import { useSelector } from "react-redux"

export const Navigation = (props) => {
    const user = useSelector(state => state.user.user)
    const hideMobile = () => {
        return props.closeMenu ? props.closeMenu(false) : null
    } 
    return (
        <nav className={css.navigation}>
            <ul>
                <li><Link onClick={hideMobile} to="/">Главная</Link></li>
                <li><Link onClick={hideMobile} to="/report">Сообщить о краже</Link></li>
                {user &&
                <>
                    <li><Link onClick={hideMobile} to="/cases">Все кражи</Link></li>
                    <li><Link onClick={hideMobile} to="/officers">Сотрудники</Link></li>
                </>}
            </ul>
        </nav> 
    )
}