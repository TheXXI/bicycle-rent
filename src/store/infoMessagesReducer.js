const defaultState = {
    unknownUser: false,
    invalidPass: false
}

export const infoMessagesuserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_UNKNOWN_USER":
            return {...state, unknownUser: true }
        case "REMOVE_UNKNOWN_USER":
            return {...state, unknownUser: false }
        case "SET_INVALID_PASSWORD":
            return {...state, invalidPass: true }
        case "REMOVE_INVALID_PASSWORD":
            return {...state, invalidPass: false }
        default:
            return state
    }
}

export const setMessageUnknownUser = () => ({ type: "SET_UNKNOWN_USER" });
export const removeMessageUnknownUser = () => ({ type: "REMOVE_UNKNOWN_USER" });

export const setMessageInvalidPass = () => ({ type: "SET_INVALID_PASSWORD" });
export const removeMessageInvalidPass = () => ({ type: "REMOVE_INVALID_PASSWORD" });