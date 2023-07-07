import { Outlet } from "react-router-dom"
import {useEffect} from "react";
import { useDispatch } from 'react-redux';
import css from "./layout.module.scss"
import { Header } from "./header/Header"
import { auth } from '../../requests/auth';
import { MessageBlock } from "./message/MessageBlock";

export const Layout = () => {
    useEffect( () => console.log('rerender Layout'))

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(auth())
        }
    },[dispatch])

    return (
        <div className={css.wrapper}>
            <Header/>
            <main>
                <MessageBlock/>
                <Outlet />
            </main>
            <footer>&copy; 2023</footer>
        </div>
    )
}