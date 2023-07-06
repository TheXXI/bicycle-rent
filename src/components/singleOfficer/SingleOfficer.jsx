import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../loaderSpinner/Spinner";
import { getOfficer } from "../../requests/officers";
import { Button } from "../shared/Button/Button";

export const SingleOfficer = () => {
    useEffect( () => {console.log('rerender SingleOfficer')});
    
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/');
    })

    const { id } = useParams();
    const {isLoaded, officer } = useSelector(state => state.singleOfficer);

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getOfficer(id));
       console.log('getOfficer');
    },[])



    return(
        <>
        {isLoaded ? 
            <div className="">
                <h2>Детальнаая страница сотрудника</h2> 

                <p>Email: {officer.email}</p>
                <p>Имя: {officer.firstName === null ? "Не указано" : officer.firstName}</p>
                <p>Фамилия: {officer.lastName === null ? "Не указано" : officer.lastName}</p>
                <p>Одобрен: {officer.approved ? "Да" : "Нет"}</p>

                <Button>Изменить</Button>
            </div> :
            <Spinner />
        }
        </>
    )
}