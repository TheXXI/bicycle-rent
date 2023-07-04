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
            clientId
        }
        if (firstname) body.firstName = firstname
        if (lastname) body.lastName = lastname

        console.log(body)

        axios
            .post(url + "sign_up", body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log('reg response: ', response.status)
                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: 'Вы успершно зарегистрировались'
                    }))
                }
            })
            .catch((error) => { //ERR_BAD_REQUEST // Пользователь с email-адресом mail@mail.ru уже существует в базе данных
                console.log('reg error: ', error)
                switch (error.response.data.errCode) {
                    case "USER_EXISTS":
                        console.log('Email занят');
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
                console.log(error.response.data.errCode)
                switch (error.response.data.errCode) {
                    case "UNKNOWN_USER":
                        console.log(1)
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
                console.log(response)
                if (response.status === 200) {
                    console.log('Токен действителен')
                    dispatch(setUser(response.data.data));
                } else {
                    console.log('some error')
                }
            })
            .catch((error) => {
                console.log('Токен не действителен')
                localStorage.clear();
            });
    }
}