import { useEffect, useState } from 'react';
import { createCase } from '../../requests/cases';
import css from './createCase.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../shared/Button/Button';
import { Input } from '../shared/Input/Input';
import { Spinner } from '../shared/loaderSpinner/Spinner';
import { getAllOfficers } from '../../requests/officers';
import { setNoLoadedOfficers } from '../../store/officersReducer';

export const CreateCase = () => {
    const user = useSelector(state => state.user.user);

    const dispatch = useDispatch();
    
    useEffect( () => console.log('rerender Form'))

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

        // if (licenseNumber.trim() !== '' && ownerFullName.trim() !== '' && type !== '') {
        //     createCase(licenseNumber, ownerFullName, type, color, date, officer, description);
        // }

        console.log(licenseNumber, ownerFullName, type, color, date, officer, description);
    }

    useEffect(() => {
        if (user) {
            dispatch(setNoLoadedOfficers());
            console.log('запрос сотрудников');
            dispatch(getAllOfficers(user.token));
        }
    },[])

    const {isLoaded, officers } = useSelector(state => state.officers);
    console.log(officers)

    const getApprovedOfficers = () => {
        return officers.filter(officer => officer.approved === true);
    }

    return (
        <>
        {!user || isLoaded ?
            <div className={css.content}>

                <h2>Сообщить о краже</h2>

                <Input
                    label="Номер лицензии"
                    type="number"
                    value={licenseNumber} 
                    onChange={(e) => {
                        setLicenseNumber(e.target.value)
                        if (licenseNumberIsEmpty) setLicenseNumberIsEmpty(false)
                    }}
                />
                <span className="error">{licenseNumberIsEmpty && "Обязательное поле"}</span>

                <Input
                    label="ФИО клиента"
                    value={ownerFullName} 
                    onChange={(e) => {
                        setOwnerFullName(e.target.value)
                        if (ownerFullNameIsEmpty) setOwnerFullNameIsEmpty(false)
                    }}
                />
                <span className="error">{ownerFullNameIsEmpty && "Обязательное поле"}</span>

                <label><span>Тип велосипеда<span className="required">*</span>:</span>
                    <select onChange={(e) => {
                        setType(e.target.value)
                        if (typeIsEmpty) setTypeIsEmpty(false)
                    }}>
                        <option value="">Выберите тип</option>
                        <option key="1" value="general">Обычный</option>
                        <option key="2" value="sport">Спорт</option>
                    </select>
                </label>
                <span className="error">{typeIsEmpty && "Обязательное поле"}</span>

                <Input
                    label={"Цвет велосипеда"}
                    value={color} 
                    onChange={(e) => { setColor(e.target.value) }}
                />
                
                <Input
                    label="Дата кражи"
                    type="date"
                    value={date} 
                    onChange={(e) => { setDate(e.target.value) }}
                />

                {user &&
                <label>Ответственный сотрудник:
                    <select onChange={(e) => {
                        setOfficer(e.target.value)
                    }}>
                        <option value="">Выберите сотрудника</option>
                        {getApprovedOfficers().map((officer, index) => (
                            <option key={index} value={officer._id}>{officer.email}</option> 
                        ))} 
                        
                    </select>
                </label>}

                <label>Дополнительная информация:
                    <textarea name="" id="" cols="5" rows="3" value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }}></textarea>
                </label>

                {/* <input type="submit" value="Отправить" className={css.submit} onClick={() => handleClick()}/> */}
                <Button onClick={() => handleClick()}>Отправить</Button>

            </div> :
            <Spinner/> 
        }
        </>
    )
}