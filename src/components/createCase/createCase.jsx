import { useEffect, useState } from 'react';
import { createCase } from '../../requests/cases';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../shared/Button/Button';
import { Input } from '../shared/FormElements/Input';
import { Spinner } from '../shared/loaderSpinner/Spinner';
import { getAllOfficers } from '../../requests/officers';
import { setNoLoadedOfficers } from '../../store/officersReducer';
import { getApprovedOfficers } from '../../utils/functions';
import { Select } from '../shared/FormElements/Select';
import { Textarea } from '../shared/FormElements/Textarea';

export const CreateCase = () => {
    const user = useSelector(state => state.user.user);
    const {isLoaded, officers } = useSelector(state => state.officers);

    const dispatch = useDispatch();

    const [licenseNumber, setLicenseNumber] = useState('');
    const [licenseNumberIsEmpty, setLicenseNumberIsEmpty] = useState(false);
    
    const [ownerFullName, setOwnerFullName] = useState('');
    const [ownerFullNameIsEmpty, setOwnerFullNameIsEmpty] = useState(false);

    const [type, setType] = useState('');
    const [typeIsEmpty, setTypeIsEmpty] = useState(false);

    const [color, setColor] = useState('');
    const [date, setDate] = useState('');

    const [officer, setOfficer] = useState('');
    const [description, setDescription] = useState('');

    const handleClick = () => {
        if (licenseNumber.trim() === '') setLicenseNumberIsEmpty(true);
        if (ownerFullName.trim() === '') setOwnerFullNameIsEmpty(true);
        if (type === '') setTypeIsEmpty(true);

        if (licenseNumber.trim() !== '' && ownerFullName.trim() !== '' && type !== '') {
            dispatch(createCase(
                user && user.token ? user.token : undefined,
                licenseNumber, ownerFullName, type, color, date, officer, description));
        }
    }

    useEffect(() => {
        if (user) {
            dispatch(setNoLoadedOfficers());
            dispatch(getAllOfficers(user.token));
        }
    },[user])

    return (
        <>
        {!user || isLoaded ?
            <>

                <h2>Сообщить о краже</h2>

                <Input
                    label="Номер лицензии"
                    type="number"
                    required={true}
                    value={licenseNumber} 
                    onChange={e => {
                        setLicenseNumber(e.target.value)
                        if (licenseNumberIsEmpty) setLicenseNumberIsEmpty(false)
                    }}
                />
                <span className="error">{licenseNumberIsEmpty && "Обязательное поле"}</span>

                <Input
                    label="ФИО клиента"
                    value={ownerFullName} 
                    required={true}
                    onChange={e => {
                        setOwnerFullName(e.target.value)
                        if (ownerFullNameIsEmpty) setOwnerFullNameIsEmpty(false)
                    }}
                />
                <span className="error">{ownerFullNameIsEmpty && "Обязательное поле"}</span>

                <Select
                    label="Тип велосипеда"
                    required={true}
                    onChange={e => {
                        setType(e.target.value);
                        if (typeIsEmpty) setTypeIsEmpty(false);
                }}>
                    <option value="">Выберите тип</option>
                    <option key="1" value="general">Обычный</option>
                    <option key="2" value="sport">Спорт</option>
                </Select>
                <span className="error">{typeIsEmpty && "Обязательное поле"}</span>

                <Input
                    label="Цвет велосипеда"
                    value={color} 
                    onChange={e => { setColor(e.target.value) }}
                />
                
                <Input
                    label="Дата кражи"
                    type="date"
                    value={date} 
                    onChange={e => { setDate(e.target.value) }}
                />

                {user && <Select
                    label="Ответственный сотрудник"
                    onChange={e => {
                        setOfficer(e.target.value);
                }}>
                    <option value="">Выберите сотрудника</option>
                    {getApprovedOfficers(officers).map((officer, index) => (
                        <option key={index} value={officer._id}>{officer.email}</option> 
                    ))}
                </Select>}

                <Textarea
                    label="Дополнительная информация"
                    value={description} 
                    onChange={e => {
                        setDescription(e.target.value)
                }}/>

                <Button onClick={() => handleClick()}>Отправить</Button>

            </> :
            <Spinner/> 
        }
        </>
    )
}