import css from "./formElements.module.scss";

export const Textarea = (props) => {
    return (
        <label className={css.label}>
            {props.required ?
                <span>{props.label}<span className="required">*</span>:</span>:
                props.label + ":"
            }
            <textarea cols="5" rows="3" value={props.value} onChange={props.onChange}></textarea>
        </label>
    )
}