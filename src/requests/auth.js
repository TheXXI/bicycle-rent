import axios from "axios";
import { setUser } from "../store/userReducer";
import { setEmailError, setInvalidPass, setMessage } from "../store/infoMessagesReducer";

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';
const url = 'https://sf-final-project-be.herokuapp.com/api/auth/';

export const signUp = (email, password, firstname, lastname) => {
    return function(dispatch) {
        let body = {
            email,
            password,
            clientId,
            approved: true
        }
        if (firstname) body.firstName = firstname
        if (lastname) body.lastName = lastname
        axios
            .post(url + "sign_up", body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: 'Вы успершно зарегистрировались'
                    }))
                }
            })
            .catch((error) => { 
                switch (error.response.data.errCode) {
                    case "USER_EXISTS":
                        dispatch(setEmailError('Email занят'));
                        break;
                    default:
                        break;
                }
            })
    }
}

export const signIn = (email, password) => {
    return function(dispatch) {
        axios
            .post(url + "sign_in", {
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.data.token) {
                    localStorage.setItem("token", response.data.data.token);
                }
                dispatch(setUser(response.data.data));
            })
            .catch((error) => {
                switch (error.response.data.errCode) {
                    case "UNKNOWN_USER":
                        dispatch(setEmailError('Пользователь с таким email не существует'));
                        break;
                    case "INVALID_PASSWORD":
                        dispatch(setInvalidPass());
                        break;
                    default:
                        break;
                }
            });
    }
}

export const auth = () => {
    return async function(dispatch) {
        const params = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        };
        axios.get(url, params)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setUser(response.data.data));
                } 
            })
            .catch(() => {
                localStorage.clear();
            });
    }
}