import css from './report.module.scss';


export const Report = () => {
    return (
        <div className={css.content}>

            <h2>Сообщить о краже</h2>
            <div className={css.columns}>
                <label>Номер лицензии:
                    <input type="text" />
                </label>
                <label>ФИО клиента:
                    <input type="text" />
                </label>
            </div>

            <div className={css.columns}>
                <label>Тип велосипеда:
                    <select>
                        <option>Выберите тип</option>
                        <option>Классика</option>
                        <option>Спорт</option>
                    </select>
                </label>
                <label>Цвет велосипеда:
                <input type="text" />
            </label>
            </div>
            
            <label className={css.date}>Дата кражи:
                <input type="text" />
            </label>

            <label>Дополнительная информация:
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>

            <input type="submit" value="Отправить" className={css.submit}/>

        </div>
    )
}