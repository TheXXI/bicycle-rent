import css from "../table.module.scss"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconClose } from "../assets/icons/Close";
import { deleteOfficerr, getAllOfficers } from "../../requests/officers";
import { Spinner } from "../loaderSpinner/Spinner";
import { setNoLoadedOfficers } from "../../store/officersReducer";


export const Officers = () => {
    useEffect( () => {console.log('rerender Officers')})
    
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate('/');
    })

    const dispatch = useDispatch()

    

    useEffect(() => {
        console.log('dispatch')
      }, [dispatch]);

    
    useEffect(() => {
        dispatch(setNoLoadedOfficers())
        console.log('запрос сотрудников')
        dispatch(getAllOfficers())
    },[])

    const deleteOfficer = (id) => {
        dispatch( deleteOfficerr(id));
     }

    const {isLoaded, officers } = useSelector(state => state.officers)
    console.log(officers)

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
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {officers.map((officer, index) => (
                            <tr key={index} onClick={() => navigate(officer._id)}>
                                <td>{officer.email}</td>
                                <td>{officer.firstName}</td>
                                <td>{officer.lastName}</td>
                                <td>{officer.approved ? "Одобрен" : "Не одобрен"}</td>
                                <td onClick={(e) => {
                                    e.stopPropagation();
                                    deleteOfficer(officer._id);
                                    }}><IconClose/>
                                </td>
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