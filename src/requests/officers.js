import axios from "axios";
import { setAllOfficers } from "../store/officersReducer";

const url = 'https://sf-final-project-be.herokuapp.com/api/officers/';

export const getAllOfficers = () => {
    return function(dispatch) {
        const params = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
          };
        axios.get(url, params)
        .then((response) => {
            // console.log(response)
            // console.log(response.status)
            // console.log(response.data.officers)

            if (response.status === 200) {
                dispatch(setAllOfficers(response.data.officers))
            }
        })
    } 
}