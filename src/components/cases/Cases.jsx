import { useDispatch, useSelector } from 'react-redux';
import css from '../table.module.scss';
import { IconClose } from '../assets/icons/Close';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setNoLoadedCases } from '../../store/casesReducer';
import { deleteCase, getAllCases } from '../../requests/cases';
import { Spinner } from '../shared/loaderSpinner/Spinner';
import { setNoLoadedOfficers } from '../../store/officersReducer';
import { getAllOfficers } from '../../requests/officers';
import { dateFormater, getOfficerByEmail, getStatus, getType } from '../../utils/functions';

export const Cases = () => {
    const user = useSelector(state => state.user.user);
    const cases = useSelector(state => state.cases);
    const officers  = useSelector(state => state.officers);

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
            dispatch(getAllCases(user.token));

            dispatch(setNoLoadedOfficers());
            dispatch(getAllOfficers(user.token));
        }
    },[dispatch, user])

    const deleteHandle = (id) => {
        dispatch(deleteCase(user.token, id));
    }
    return(
        <>
        {cases.isLoaded && officers.isLoaded ?
            <div className={css.content}>
                <h2>Сообщения о кражах</h2>
                {cases.cases.length === 0 ? <center>Список сообщений о кражах пуст</center> :
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
                            <td>Сотрудник</td>
                            {user.approved && <td></td>}
                        </tr>
                    </thead>
                    <tbody>
                        {cases.cases.map((currentCase, index ) => (
                            <tr key={index} onClick={() => navigate(currentCase._id)}>
                                <td>{getStatus(currentCase.status)}</td>
                                <td>{currentCase.licenseNumber}</td>
                                <td>{getType(currentCase.type)}</td>
                                <td>{currentCase.ownerFullName}</td>
                                <td>{currentCase.color}</td>
                                <td>{dateFormater(currentCase.date)}</td>
                                <td>{getOfficerByEmail(currentCase.officer, officers.officers)}</td>
                                {!user.approved ? <td></td> :
                                <td onClick={e => {
                                    e.stopPropagation();
                                    deleteHandle(currentCase._id);
                                    }}><IconClose/>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div> }
            </div> :
            <Spinner />
        }
        </>
    )
}