import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../shared/loaderSpinner/Spinner";
import { getOfficer, updateOfficer } from "../../requests/officers";
import { Button } from "../shared/Button/Button";
import { Input } from "../shared/FormElements/Input";

export const SingleOfficer = () => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/');
    })

    const { id } = useParams();
    const {isLoaded, officer } = useSelector(state => state.singleOfficer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getOfficer(user.token, id));
        }
    },[dispatch, user])

    const [isEdit, setIsEdit] = useState(false);

    
    const [firstname, setFirstname] = useState(officer ? officer.firstName : '');
    const [lastname, setLastname] = useState(officer ? officer.lastName : '');
    const [approved, setApproved] = useState(officer ? officer.approved : false);

    useEffect(() => {
        if (officer) {
            setFirstname(officer.firstName ? officer.firstName : '');
            setLastname(officer.lastName ? officer.lastName : '');
            setApproved(officer.approved);
        }
    }, [officer])

    const handleClick = () => {
        setIsEdit(false);
        dispatch(updateOfficer(user.token, officer._id, firstname, lastname, approved))
    }

    return(
        <>
        {isLoaded ? 
            <>
                <h2>Детальнаая страница сотрудника</h2> 

                <p>Email: {officer.email}</p>
                <p>Имя: {officer.firstName === null ? "Не указано" : officer.firstName}</p>
                {isEdit && 
                <Input 
                    label={"Имя"}
                    value={firstname}
                    onChange={e => setFirstname(e.target.value) }/>
                }

                <p>Фамилия: {officer.lastName === null ? "Не указано" : officer.lastName}</p>
                {isEdit && 
                <Input 
                    label={"Фамилия"}
                    value={lastname} 
                    onChange={e => setLastname(e.target.value) }/>
                }

                <p>Одобрен: {officer.approved ? "Да" : "Нет"}</p>

                {isEdit &&
                <Input 
                    label={"Одобрен"}
                    type={"checkbox"}
                    disabled={officer._id === user.id}
                    checked={approved} 
                    onChange={() => setApproved(!approved) }
                    />
                }

                {user.approved && 
                    <Button onClick={() => {
                        isEdit ? handleClick() : setIsEdit(true)
                    }}>{isEdit ? "Отправить" : "Изменить"}</Button>
                }
                &nbsp;
                {isEdit &&<Button onClick={() => setIsEdit(false)}>Отмена</Button>}
            </> :
            <Spinner />
            }
        </>
    )
}