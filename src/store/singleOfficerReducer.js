const defaultState = {
    officer: undefined,
    isLoaded: false,
    error: undefined,
}

export const singleOfficerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_SINGLE_OFFICER":
            return {...state, officer: action.payload, isLoaded: true }
        /*case "SET_NO_LOADED":
            return {...state, isLoaded: false }
        case "SET_LOADED":
            return {...state, isLoaded: true }*/
        case "SET_OFFICER_ERROR":
            return {...state, isLoaded: true, error: action.payload, isLoaded: true}
        default:
            return state
    }
}

export const setSingleOfficer = (payload) => ({type: "SET_SINGLE_OFFICER", payload});
export const setSingleOfficerError = (payload) => ({type: "SET_OFFICER_ERROR", payload});