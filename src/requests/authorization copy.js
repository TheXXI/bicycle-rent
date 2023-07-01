import axios from "axios";
import { store } from "../store/index";
import { removeUser, setUser } from "../store/userReducer";

const state = store.getState();

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';
const url = 'https://sf-final-project-be.herokuapp.com/api/auth/';

function getLocalsStorage() {
    const data = JSON.parse(localStorage.getItem('token'));
    return data ? data : {};
}

function setLocalsStorage(data) {
    localStorage.clear();
    localStorage.setItem('token', JSON.stringify(data));
}

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

function dis () {
    store.dispatch(setUser(123))

}

export const signIn = (email, password, setIncorrectEmail, setIncorrectPassword) => {
    axios
        .post(url + "sign_in", {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.data.data.token) { localStorage.setItem("user", JSON.stringify(response.data.data)) } 
        })
        .catch(function(error) {
            console.log("error: ", error)
            switch (error.response.data.errCode) {
                case "UNKNOWN_USER":
                    setIncorrectEmail(true)
                    break;
                case "INVALID_PASSWORD":
                    setIncorrectPassword(true)
                    break;
                default:
                    break;
            }
        });
}


                /*setLocalsStorage({
                    id: response.data.data.id,
                    token: response.data.data.token,
                    approved: response.data.data.user.approved,
                    user: {
                        email: response.data.data.user.email,
                        firstname: response.data.data.user.firstName,
                        lastname: response.data.data.user.lastName
                    }
                })*/