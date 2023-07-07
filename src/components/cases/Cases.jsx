import { useDispatch, useSelector } from 'react-redux';
import css from '../table.module.scss';
import { IconClose } from '../assets/icons/Close';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setNoLoadedCases } from '../../store/casesReducer';
import { getAllCases } from '../../requests/cases';

export const Cases = () => {
    const user = useSelector(state => state.user.user);
    const {isLoaded, cases } = useSelector(state => state.cases);

    const navigate = useNavigate() 
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(setNoLoadedCases());
            console.log('запрос сообщений');
            dispatch(getAllCases(user.token));
        }
    },[dispatch])

    console.log(cases)
    return(
        <div className={css.content}>
             <h2>Сообщения о кражах</h2>
             <div className={css['table-wrapper']}>
             <table className={css.table}>
                <thead>
                    <tr>
                        <td>Статус</td>
                        <td>Номер лицензии</td>
                        <td>Тип велосипеда</td>
                        <td>ФИО арендатора</td>
                        <td>Цвет</td>
                        <td>Дата кражи</td>
                        <td>Дата сообщения</td>
                        <td>Сотрудник</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((currentCase, index ) => (
                        <tr key={index} onClick={() => console.log('open')}>
                            <td>{currentCase.status}</td>
                            <td>{currentCase.licenseNumber}</td>
                            <td>{currentCase.type}</td>
                            <td>{currentCase.ownerFullName}</td>
                            <td>{currentCase.color}</td>
                            <td>{currentCase.date}</td>
                            <td>{currentCase.createdAt}</td>
                            <td>Сотрудник</td>
                            <td onClick={(e) => {
                                e.stopPropagation()
                                console.log('close')
                                }}><IconClose/>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
             </div>
        </div>
    )
}