import css from './header.module.scss';
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className={css.header}>
            <h1>Прокат <span>велосипедов</span></h1>

            <nav className={css.navigation}>
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/prices">Тарифы</Link></li>
                    <li><Link to="/report">Сообщить о краже</Link></li>
                    <li><Link to="/allreports">Все кражи</Link></li>
                    <li><Link to="/staff">Сотрудники</Link></li>
                </ul>
            </nav>            
            <Link to="/" className={css.login}>Вход</Link>
        </header>
    )
}