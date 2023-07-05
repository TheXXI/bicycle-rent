import axios from "axios";
import { setAllOfficers } from "../store/officersReducer";
import { setMessage } from "../store/infoMessagesReducer";

const url = 'https://sf-final-project-be.herokuapp.com/api/officers/';

const headers = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    },
};

export const getAllOfficers = () => {
    return function(dispatch) {
        axios.get(url, headers)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setAllOfficers(response.data.officers))
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

export const deleteOfficerr = (id) => {
    return function(dispatch) {
        axios.delete(url + id, headers)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setMessage({
                        success: true,
                        text: `Сотрудник успешно удален`
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