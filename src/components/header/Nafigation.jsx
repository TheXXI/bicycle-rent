import { Link } from "react-router-dom"
import css from './header.module.scss'

export const Navigation = (props) => {
    const hideMobile = () => {
        return props.closeMenu ? props.closeMenu(false) : null
    } 
    return (
        <nav className={css.navigation}>
            <ul>
                <li><Link onClick={hideMobile} to="/">Главная</Link></li>
                <li><Link onClick={hideMobile} to="/prices">Тарифы</Link></li>
                <li><Link onClick={hideMobile} to="/report">Сообщить о краже</Link></li>
                <li><Link onClick={hideMobile} to="/cases">Все кражи</Link></li>
                <li><Link onClick={hideMobile} to="/staff">Сотрудники</Link></li>
            </ul>
        </nav> 
    )
}