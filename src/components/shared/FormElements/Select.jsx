import css from "./formElements.module.scss";

export const Select = (props) => {
    return (
        <label className={css.label}>
            {props.required ?
                <span>{props.label}<span className="required">*</span>:</span>:
                props.label + ":"
            }
            <select onChange={props.onChange} value={props.value}>
                {props.children}
            </select>
        </label>
        )
}