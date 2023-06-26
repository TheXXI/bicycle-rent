import axios from "axios";

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';

const url = 'https://sf-final-project-be.herokuapp.com/api/auth/sign_in';

function getLocalsStorage() {
    const data = JSON.parse(localStorage.getItem('user'));
    return data ? data : {};
}

function setLocalsStorage(data) {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(data));
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

export const signIn = (email, password, setIncorrectEmail, setIncorrectPassword) => {
    localStorage.clear();
    axios
        .post("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            console.log(response);
            if (response.data.status === "OK") {
                console.log(response.data.data.token)
                setLocalsStorage({
                    id: response.data.data.id,
                    token: response.data.data.token,
                    approved: response.data.data.user.approved,
                    user: {
                        email: response.data.data.user.email,
                        firstname: response.data.data.user.firstName,
                        lastname: response.data.data.user.lastName
                    }
                })
            } else {
                console.log("some errpr")
            }
        })
        .catch(function(error) {
            console.log("error: ", error)
            console.log(error.response.data.errCode);
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