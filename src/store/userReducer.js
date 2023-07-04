const defaultState = {
    user: undefined
}

// const defaultState = {
//     user: {
//         id: "64992f14a687ee5e66c557f3",
//         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTkyZjE0YTY4N2VlNWU2NmM1NTdmMyIsImlhdCI6MTY4ODIxNzA3NSwiZXhwIjoxNjg4ODIxODc1fQ.FjiTS-4gOPMXIowf40vyGEoj9_wpQYKWea6czqhZznQ",
//         approved: true,
//         info: {
//             email: "mikhailkuris@ya.ru",
//             firstname: "Михаил",
//             lastname: "Курис"
//         }
//     }
// }

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