const defaultState = {
    user: undefined
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: {
                    id: action.payload.user.id,
                    token: action.payload.token,
                    approved: action.payload.user.approved,
                    info: {
                        email: action.payload.user.email,
                        firstname: action.payload.user.firstName,
                        lastname: action.payload.user.lastName
                    }
                }
            }
        case "REMOVE_USER":
            return {...state, user: undefined}
        default:
            return state
    }
}

export const setUser = (payload) => ({ type: "SET_USER", payload });
export const removeUser = () => ({ type: "REMOVE_USER" });