import axios from "axios";

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';

const url = 'https://sf-final-project-be.herokuapp.com/api/auth/sign_in';


export const signIn1 = (email, password) => {
    axios.post(url, {
            email: 'mail@mail.ru',
            password: '12345'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            console.log('response: ', response.data);
        })
        .catch(function(error) {
            console.log('error: ', error.response.data);
        });
}

export const signIn = (email, password) => {
    let raw = {
        email: 'mail@mail.ru',
        password: '12345'
    };
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}