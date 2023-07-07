import axios from "axios";
import { store } from "../store/index";
import { setMessage } from "../store/infoMessagesReducer";
import { setAllCases } from "../store/casesReducer";

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';
const url = 'https://sf-final-project-be.herokuapp.com/api/';

export const getAllCases = (token) => {
    return function(dispatch) {
        axios.get(url + "cases/", {headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setAllCases(response.data.data))
                }
            })
            .catch((error) => {
                console.log("error: ", error)
                dispatch(setMessage({
                    success: false,
                    text: `${error.response.data.message}`
                }))
            })
    }
}

export const createCase = (licenseNumber, ownerFullName, type, color, date, officer, description) => {
    return function(dispatch) {
        const user = store.getState().user.user;

        console.log(user)

        let body = {
            licenseNumber,
            ownerFullName,
            type,
            createdAt: (new Date).toISOString().split('T')[0]
        }

        if (color) body.color = color
        if (date) body.date = date
        if (officer) body.officer = officer
        if (description) body.description = description

        let headers = {
            'Content-Type': 'application/json'
        }

        let currentUrl = url

        if (user) {
            currentUrl += 'cases/'
            headers.Authorization = `Bearer ${user.token}`
        } else {
            body.clientId = clientId
            currentUrl += 'public/report'
        }

        //console.log(currentUrl, body, headers)

        axios.post(currentUrl, body, { headers })
            .then((response) => {
                console.log("success: ", response)
                console.log("success: ", response.data)
                console.log("success: ", response.status)

                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: 'Сообщение успешно отправлено'
                    }))
                }
            })
            .catch((error) => {
                console.log("error: ", error)
                dispatch(setMessage({
                    success: false,
                    text: `${error.response.data.message}`
                }))
            })
    }
}