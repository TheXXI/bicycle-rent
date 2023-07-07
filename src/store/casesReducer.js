const defaultState = {
    cases: [],
    isLoaded: false
}

export const casesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_ALL_CASES":
            return {...state, cases: action.payload, isLoaded: true }
        case "SET_NO_LOADED":
            return {...state, isLoaded: false }
        case "SET_LOADED":
            return {...state, isLoaded: true }
        case "REMOVE_CASE":
            const cases = state.cases;
            return {...state, cases: cases.filter(currentCases => currentCases._id !== action.payload), isLoaded: true}
        default:
            return state
    }
}

export const setAllCases = (payload) => ({ type: "SET_ALL_CASES", payload });
export const setNoLoadedCases = () => ({ type: "SET_NO_LOADED" });
export const setLoadedCases = () => ({ type: "SET_LOADED" });
export const removeCase = (payload) => ({ type: "REMOVE_CASE", payload });