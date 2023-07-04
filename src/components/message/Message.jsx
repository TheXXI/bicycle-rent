import css from './message.module.scss';
import { IconSuccess } from '../assets/icons/Success';
import { IconFailure } from '../assets/icons/Failure';
import { IconClose } from '../assets/icons/Close';
import { useDispatch } from 'react-redux';
import { removeMessage } from '../../store/infoMessagesReducer';

//<Message message={{success: false, message: "Произошла ошибка"}}/>

export const Message = (props) => {
    const {success, text} = props.message;
    const dispatch = useDispatch();

    return (
        <div className={css['message-block']}>
            {success ? <IconSuccess/> : <IconFailure/>}
            <span className={css.message}>{text}</span>
            <div className={css.close} onClick={() => dispatch(removeMessage())}><IconClose/></div>
        </div>
    )
}