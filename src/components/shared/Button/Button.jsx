import css from "./button.module.scss";

export const Button = (props) => {
    return (
        <button className={css.button} onClick={props.onClick}>{props.children}</button>
    )
}