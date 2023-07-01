import { useSelector } from 'react-redux';
import css from './cases.module.scss';

export const Cases = () => {
    const cases = useSelector(state => state.cases.cases)
    console.log(cases)
    return(
        <div className={css.content}>
             <h2>Сообщения о кражах</h2>
             {cases.map((currentCase) => (
                <div>{currentCase.status}</div>
             ))}
        </div>
    )
}