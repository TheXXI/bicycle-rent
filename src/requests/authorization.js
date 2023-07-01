import axios from "axios";
import { setUser } from "../store/userReducer";
import { setMessageUnknownUser, setMessageInvalidPass } from "../store/infoMessagesReducer";

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';
const url = 'https://sf-final-project-be.herokuapp.com/api/auth/';

export const signUp = (email, password, firstname, lastname, setIncorrectEmail, setIncorrectPassword) => {
    let body = {
        email,
        password,
        clientId
    }
    if (firstname) body.firstname = firstname
    if (lastname) body.lastname = lastname

    console.log(body)
}


/*"errCode": "USER_EXISTS",
    "message": "Пользователь с email-адресом user1@skillfactory.ru уже существует в базе данных"*/

export const signIn = (email, password) => {
    console.log(123)
    return async function(dispatch) {
        await axios
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
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                }
                dispatch(setUser(response.data.data));
            })
            .catch((error) => {
                switch (error.response.data.errCode) {
                    case "UNKNOWN_USER":
                        dispatch(setMessageUnknownUser());
                        break;
                    case "INVALID_PASSWORD":
                        dispatch(setMessageInvalidPass());
                        break;
                    default:
                        break;
                }
            });
    }
}