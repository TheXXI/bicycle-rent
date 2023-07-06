import css from "./input.module.scss";

export const Input = (props) => {
    return (
        <label className={css.label}>
            {props.required ?
                <span>{props.children}<span className="required">*</span>:</span>:
                props.children
            }
            <input type={props.type} value={props.value} onChange={props.onChange}/>
        </label>
    )
}