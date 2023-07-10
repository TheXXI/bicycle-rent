import axios from "axios";
import { removeOfficer, setAllOfficers } from "../store/officersReducer";
import { setMessage } from "../store/infoMessagesReducer";
import { setSingleOfficer, setSingleOfficerError } from "../store/singleOfficerReducer";

const url = 'https://sf-final-project-be.herokuapp.com/api/officers/';

export const getAllOfficers = (token) => {
    return function(dispatch) {
        axios.get(url, {headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setAllOfficers(response.data.officers))
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

export const getOfficer = (token, id) => {
    return function(dispatch) {
        axios.get(url + id, {headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }})
        .then((response) => {
            if (response.status === 200) {
                dispatch(setSingleOfficer(response.data.data))
            }
        })
        .catch((error) => {
            dispatch(setSingleOfficerError(error.response.data.message))
        })
    }
}

export const updateOfficer = (token, id, firstname, lastname, approved) => {
    return function(dispatch) {
        axios.put(url + id, {firstName: firstname, lastName: lastname, approved: approved}, {headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }})
        .then((response) =>  {
            if (response.status === 200) {
                dispatch(setSingleOfficer(response.data.data))
                dispatch(setMessage({
                    success: true,
                    text: "Пользователь успешно изменен."
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

export const deleteOfficer = (token, id, email) => {
    return function(dispatch) {
        axios.delete(url + id, {headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }})
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: `Сотрудник ${email} успешно удален`
                    }));
                    dispatch(removeOfficer(id));
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