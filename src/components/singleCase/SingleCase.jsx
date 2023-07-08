import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../shared/loaderSpinner/Spinner";
import { getCase, updateCase } from "../../requests/cases";
import { dateFormater, getApprovedOfficers, getOfficerByEmail, getStatus } from "../../utils/functions";
import { setNoLoadedOfficers } from "../../store/officersReducer";
import { getAllOfficers } from "../../requests/officers";
import { Button } from "../shared/Button/Button";
import { Select } from "../shared/FormElements/Select";
import { Input } from "../shared/FormElements/Input";
import { Textarea } from "../shared/FormElements/Textarea";

export const SingleCase = () => {
    useEffect( () => {console.log('rerender SingleCase')});
    const {isLoaded, currentCase} = useSelector(state => state.singleCase);
    const officers  = useSelector(state => state.officers);

    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate('/');
    })

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getCase(user.token, id));
       console.log('getCase');

       dispatch(setNoLoadedOfficers());
       console.log('запрос сотрудников');
       dispatch(getAllOfficers(user.token));
    },[dispatch])

    const [isEdit, setIsEdit] = useState(false);

    const [status, setStatus] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [ownerFullName, setOwnerFullName] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [date, setDate] = useState('');
    const [officer, setOfficer] = useState('');
    const [description, setDescription] = useState('');
    const [resolution, setResolution] = useState('');

    useEffect(() => {
        if (currentCase) {
            setStatus(currentCase.status);
            setLicenseNumber(currentCase.licenseNumber);
            setOwnerFullName(currentCase.ownerFullName);
            setType(currentCase.type);
            setColor(currentCase.color);
            setDate(currentCase.date);
            setOfficer(currentCase.officer)
            setDescription(currentCase.description);
            setResolution(currentCase.resolution);
        }
    }, [currentCase])

    console.log(officers.officers);

    const handleClick = () => {
        setIsEdit(false);
        if (status == "done") setResolution(null);

        console.log('type: ', type);
        console.log('ownerFullName: ', ownerFullName);

        dispatch(updateCase(user.token, id, status, licenseNumber, ownerFullName, date, type, color, officer, description, resolution));
    }

    return (
        <>
            {isLoaded && officers.isLoaded? 
            <>
                <h2>Детальная страница сообщения о краже</h2>

                <p>Дата и время создания сообщения: {dateFormater(currentCase.createdAt, true)}</p>
                {currentCase.updatedAt && <p>Дата и время последнего обновления сообщения: {dateFormater(currentCase.updatedAt, true)}</p>}

                <p>Статус: {getStatus(currentCase.status)}</p>
                {isEdit && <Select
                    label="Статус"
                    value={status}
                    onChange={e => {setStatus(e.target.value);}}
                >
                    <option value="">Выберите тип</option>
                    <option key="1" value="new">Новое</option>
                    <option key="2" value="in_progress">В процессе</option>
                    <option key="3" value="done">Выполнено</option>
                </Select>}

                <p>Номер лицензии: {currentCase.licenseNumber}</p>
                {isEdit && <Input
                    label="Номер лицензии"
                    value={licenseNumber}
                    onChange={e => setLicenseNumber(e.target.value)}
                />}

                <p>ФИО пользователя: {currentCase.ownerFullName}</p>
                {isEdit && <Input
                    label="ФИО пользователя"
                    value={ownerFullName}
                    onChange={e => setOwnerFullName(e.target.value)}
                />}

                <p>Тип велосипеда: {currentCase.type}</p>
                {isEdit && <Select
                    label="Тип велосипеда"
                    value={type}
                    onChange={e => setType(e.target.value)}
                >
                    <option value="">Выберите тип</option>
                    <option key="1" value="general">Обычный</option>
                    <option key="2" value="sport">Спорт</option>
                </Select>}

                {currentCase.color && <p>Цвет велосипеда: {currentCase.color}</p> }
                {isEdit && <Input
                    label="Цвет велосипеда"
                    value={color}
                    onChange={e => setColor(e.target.value)}
                />}
                {currentCase.date && <p>Дата кражи: {dateFormater(currentCase.date)}</p> }
                {isEdit && <Input
                    label="Дата кражи"
                    value={String(date).slice(0, -14)}
                    type="date"
                    onChange={e => setDate(e.target.value)}
                />}
                {currentCase.officer && <p>Ответственный сотрудник: {getOfficerByEmail(currentCase.officer, officers.officers)}</p>}
                {isEdit && <Select
                    label="Ответственный сотрудник"
                    value={officer}
                    onChange={e => {
                        setOfficer(e.target.value);
                }}>
                    <option value="">Выберите сотрудника</option>
                    {getApprovedOfficers(officers.officers).map((officer, index) => (
                        <option key={index} value={officer._id}>{officer.email}</option> 
                    ))}
                </Select>}

                {currentCase.description && <p>Дополнительный комментарий: {currentCase.description}</p>}
                {isEdit && <Textarea
                    label="Дополнительная информация"
                    value={description} 
                    onChange={e => {
                        setDescription(e.target.value)
                }}/>}

                {currentCase.resolution && <p>Завершающий комментарий: {currentCase.resolution}</p>}
                {isEdit && status == "done" && <Textarea
                    label="Завершающий комментарий"
                    value={resolution} 
                    onChange={e => {
                        setResolution(e.target.value)
                }}/>}

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