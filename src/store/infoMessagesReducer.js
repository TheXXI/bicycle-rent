const defaultState = {
    isLoading: false,
    emailError: false,
    invalidPass: false,
    message: undefined
}

export const infoMessagesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SHOW_LOADER":
            return {...state, isLoading: true }
        case "REMOVE_LOADER":
            return {...state, isLoading: false }
        case "SET_EMAIL_ERROR":
            return {...state, emailError: action.payload }
        case "REMOVE_EMAIL_ERROR":
            return {...state, emailError: undefined }
        case "SET_INVALID_PASSWORD":
            return {...state, invalidPass: true }
        case "REMOVE_INVALID_PASSWORD":
            return {...state, invalidPass: false }
        case "SET_MESSAGE":
            return {...state, message: action.payload }
        case "REMOVE_MESSAGE":
            return {...state, message: undefined }
        default:
            return state
    }
}

export const showLoader = () => ({ type: "SHOW_LOADER" });
export const removeLoader = () => ({ type: "REMOVE_LOADER" });

export const setEmailError = (payload) => ({ type: "SET_EMAIL_ERROR", payload });
export const removeEmailError = () => ({ type: "REMOVE_EMAIL_ERROR" });

export const setInvalidPass = () => ({ type: "SET_INVALID_PASSWORD" });
export const removeInvalidPass = () => ({ type: "REMOVE_INVALID_PASSWORD" });

export const setMessage = (payload) => ({ type: "SET_MESSAGE", payload });
export const removeMessage = () => ({ type: "REMOVE_MESSAGE" });

