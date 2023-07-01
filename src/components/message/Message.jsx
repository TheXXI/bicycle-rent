import css from './message.module.scss';
import { IconSuccess } from './icons/Success';
import { IconFailure } from './icons/Failure';
import { IconClose } from './icons/Close';

//<Message message={{success: false, message: "Произошла ошибка"}}/>

export const Message = (props) => {
    const {success, message} = props.message;

    return (
        <div className={css['message-block']}>
            {success ? <IconSuccess wi/> : <IconFailure/>}
            <span className={css.message}>{message}</span>
            <div className={css.close}><IconClose/></div>
        </div>
    )
}