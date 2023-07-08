import css from "./formElements.module.scss";

export const Input = (props) => {
    const isCheckbox = props.type === "checkbox" ? 
    {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center'
    } 
    : undefined;
    return (
        <label className={css.label} style={isCheckbox}>
            {props.required ?
                <span>{props.label}<span className="required">*</span>:</span>:
                props.label + ":"
            }
            <input 
                type={props.type ? props.type : "text"}
                value={props.value}
                valueAsDate={props.valueAsDate}
                onChange={props.onChange}
                checked={props.checked}
                disabled={props.disabled}
            />
        </label>
    )
}