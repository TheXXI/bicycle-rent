import css from "../table.module.scss"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconClose } from "../assets/icons/Close";
import { deleteOfficer, getAllOfficers } from "../../requests/officers";
import { Spinner } from "../shared/loaderSpinner/Spinner";
import { setNoLoadedOfficers } from "../../store/officersReducer";


export const Officers = () => {
    const {isLoaded, officers } = useSelector(state => state.officers);
    
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/');
    })

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (user) {
            dispatch(setNoLoadedOfficers());
            dispatch(getAllOfficers(user.token));
        }
    },[dispatch])

    const deleteHandle = (id, email) => {
        dispatch(setNoLoadedOfficers());
        dispatch(deleteOfficer(user.token, id, email));
    }

    return(
        <>
        {isLoaded ?
            <div className={css.content}>
                <h2>Соотрудники</h2>
                <div className={css['table-wrapper']}>
                <table className={css.table}>
                    <thead>
                        <tr>
                            <td>E-mail</td>
                            <td>Имя сотрудника</td>
                            <td>Фамилия сотрудника</td>
                            <td>Статус сотрудника</td>
                            {user.approved && <td></td>}
                        </tr>
                    </thead>
                    <tbody>
                        {officers.map((officer, index) => (
                            <tr key={index} onClick={() => navigate(officer._id)}>
                                <td>{officer.email}</td>
                                <td>{officer.firstName}</td>
                                <td>{officer.lastName}</td>
                                <td>{officer.approved ? "Одобрен" : "Не одобрен"}</td>
                                {officer._id === user.id || !user.approved ? <td></td> :
                                <td onClick={
                                    e => {
                                    e.stopPropagation();
                                    deleteHandle(officer._id, officer.email);
                                    }}><IconClose/>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                
            </div> :
            <Spinner/> 
        }
        </>
    )
}