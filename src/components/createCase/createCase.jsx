import { useEffect, useState } from 'react';
import { createCase } from '../../requests/cases';
import css from './createCase.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../shared/Button/Button';
import { Input } from '../shared/Input/Input';
import { Spinner } from '../loaderSpinner/Spinner';
import { getAllOfficers } from '../../requests/officers';
import { setNoLoadedOfficers } from '../../store/officersReducer';

export const CreateCase = () => {
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()
    
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
        if (licenseNumber.trim() === '') setLicenseNumberIsEmpty(true)
        if (ownerFullName.trim() === '') setOwnerFullNameIsEmpty(true)
        if (type === '') setTypeIsEmpty(true)

        if (licenseNumber.trim() !== '' && ownerFullName.trim() !== '' && type !== '') {
            dispatch(createCase(licenseNumber, ownerFullName, type, color, date, description))
        }
    }

    useEffect(() => {
        dispatch(setNoLoadedOfficers())
        console.log('запрос сотрудников')
        dispatch(getAllOfficers())
    },[])

    const {isLoaded, officers } = useSelector(state => state.officers)
    console.log(officers)

    const getApprovedOfficers = () => {
        return officers.filter(item => item.approved === true)
    }

    return (
        <>
        {isLoaded ?
            <div className={css.content}>

                <h2>Сообщить о краже</h2>
                
                <label><span>Номер лицензии<span className="required">*</span>:</span>
                    <input type="number" value={licenseNumber} onChange={(e) => {
                        setLicenseNumber(e.target.value)
                        if (licenseNumberIsEmpty) setLicenseNumberIsEmpty(false)
                    }}/>
                </label>
                <span className="error">{licenseNumberIsEmpty && "Обязательное поле"}</span>

                <label><span>ФИО клиента<span className="required">*</span>:</span>
                    <input type="text" value={ownerFullName} onChange={(e) => {
                        setOwnerFullName(e.target.value)
                        if (ownerFullNameIsEmpty) setOwnerFullNameIsEmpty(false)
                    }}/>
                </label>
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

                {/* <label>Цвет велосипеда:
                    <input type="text" value={color} onChange={(e) => {
                        setColor(e.target.value)
                    }}/>
                </label> */}

                <Input type={"text"} value={color} onChange={(e) => {
                        setColor(e.target.value)
                }}>Цвет велосипеда:</Input>
                
                <label className={css.date}>Дата кражи:
                    <input type="date" value={date} onChange={(e) => {
                        setDate(e.target.value)
                    }}/>
                </label>

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