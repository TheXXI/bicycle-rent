const defaultState = {
    officers: [],
    isLoaded: false
}

export const officerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_ALL_OFFICERS":
            return {...state, officers: action.payload, isLoaded: true }
        case "SET_NO_LOADED":
            return {...state, isLoaded: false }
        case "SET_LOADED":
            return {...state, isLoaded: true }
        case "REMOVE_OFFICER":
            return state
        default:
            return state
    }
}

export const setAllOfficers = (payload) => ({ type: "SET_ALL_OFFICERS", payload });
export const setNoLoadedOfficers = () => ({ type: "SET_NO_LOADED" });
export const setLoadedOfficers = () => ({ type: "SET_LOADED" });