import axios from "axios";
import { store } from "../store/index";
import { setMessage } from "../store/infoMessagesReducer";
import { removeCase, setAllCases } from "../store/casesReducer";
import { setSingleCase, setSingleCaseError } from "../store/singleCaseReducer";

const clientId = '6d5f17ab-9b5d-44d6-bc42-aa1617498f4d';
const url = 'https://sf-final-project-be.herokuapp.com/api/';

export const getAllCases = (token) => {
    return function(dispatch) {
        axios.get(url + "cases/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setAllCases(response.data.data))
                }
            })
            .catch((error) => {
                dispatch(setMessage({
                    success: false,
                    text: `${error.response.data.message}`
                }))
            })
    }
}

export const getCase = (token, id) => {
    return function(dispatch) {
        axios.get(url + 'cases/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setSingleCase(response.data.data))
                }
            })
            .catch((error) => {
                dispatch(setSingleCaseError(error.response.data.message))
            })
    }
}

export const createCase = (token, licenseNumber, ownerFullName, type, color, date, officer, description) => {
    return function(dispatch) {
        const user = store.getState().user.user;
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
            headers.Authorization = `Bearer ${token}`
        } else {
            body.clientId = clientId
            currentUrl += 'public/report'
        }

        axios.post(currentUrl, body, { headers })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: 'Сообщение успешно отправлено'
                    }))
                }
            })
            .catch((error) => {
                dispatch(setMessage({
                    success: false,
                    text: `${error.response.data.message}`
                }))
            })
    }
}

export const updateCase = (token, id, status, licenseNumber, type, ownerFullName, date, color, officer, description, resolution) => {
    return function(dispatch) {
        const body = {
            status: status,
            licenseNumber: licenseNumber,
            ownerFullName: ownerFullName,
            type: type,
            color: color,
            date: date,
            officer: officer,
            description: description,
            resolution: resolution
        }
        axios.put(url + 'cases/' + id, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setSingleCase(body))
                    dispatch(setMessage({
                        success: true,
                        text: `Сообщение успешно изменено`
                    }));
                }
            })
            .catch((error) => {
                dispatch(setMessage({
                    success: false,
                    text: `${error.response.data.message}`
                }));
            })
    }
}

export const deleteCase = (token, id) => {
    return function(dispatch) {
        axios.delete(url + 'cases/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: `Сообщение успешно удалено`
                    }));
                    dispatch(removeCase(id));
                }
            })
            .catch((error) => {
                dispatch(setMessage({
                    success: false,
                    text: `${error.response.data.message}`
                }));
            })
    }
}