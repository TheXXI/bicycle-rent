const defaultState = {
    currentCase: undefined,
    isLoaded: false,
    error: undefined,
}

export const singleCaseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_SINGLE_CASE":
            return {...state, currentCase: action.payload, isLoaded: true }
        case "SET_CASE_ERROR":
            return {...state, isLoaded: true, error: action.payload, isLoaded: true }
        default:
            return state
    }
}

export const setSingleCase = (payload) => ({ type: "SET_SINGLE_CASE", payload });
export const setSingleCaseError = (payload) => ({ type: "SET_CASE_ERROR", payload });