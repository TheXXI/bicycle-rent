import css from './notfound.module.scss'
import notFoundImage from './images/404.jpg'

export const NotFound = () => {
    return (
        <div className={css.notfound}>
            <h2>Ошибка 404</h2>
            <img src={notFoundImage} alt="Ошибка 404" />
            По данному адресу страница отстутсвует.
        </div>
    )
}