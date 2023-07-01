import css from './header.module.scss'
import { IconProfile } from './icons/Profile';

export const Profile = (props) => {
    const {email, firstname, lastname} = props.user;

    return (
        <div className={css.profile}>
            <div className={css['text-elements']}>
                <span className={css.login}>
                            { firstname && lastname ? firstname + " " + lastname[0] + "." : email }
                </span>
                <button className={css['exit-button']}>Выйти</button>
            </div>
            <IconProfile/>
        </div>
    )
}