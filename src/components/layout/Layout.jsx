import { Outlet } from "react-router-dom"
import { Header } from "../header/Header"
import css from "./layout.module.scss"


export const Layout = () => {
    return (
        <div className={css.wrapper}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}