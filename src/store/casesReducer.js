const defaultState = {
    cases: [{
            status: "new",
            licenseNumber: "111111",
            type: "general",
            ownerFullName: "Курис М.В",
            clientId: "6d5f17ab-9b5d-44d6-bc42-aa1617498f4d",
            createdAt: "01.01.2023",
            updatedAt: "",
            color: "Красный",
            date: "01.01.2023",
            officer: "64992f14a687ee5e66c557f3",
            description: "",
            resolution: ""
        },
        {
            status: "new",
            licenseNumber: "111111",
            type: "general",
            ownerFullName: "Курис М.В",
            clientId: "6d5f17ab-9b5d-44d6-bc42-aa1617498f4d",
            createdAt: "01.01.2023",
            updatedAt: "",
            color: "Красный",
            date: "01.01.2023",
            officer: "64992f14a687ee5e66c557f3",
            description: "",
            resolution: ""
        },
        {
            status: "new",
            licenseNumber: "234567",
            type: "general",
            ownerFullName: "Иванов И.И.",
            clientId: "6d5f17ab-9b5d-44d6-bc42-aa1617498f4d",
            createdAt: "05.05.2023",
            updatedAt: "",
            color: "БЕЛЫЙ",
            date: "05.05.2023",
            officer: "64992f14a687ee5e66c557f3",
            description: "",
            resolution: ""
        },
        {
            status: "in_progress",
            licenseNumber: "111111",
            type: "general",
            ownerFullName: "Курис М.В",
            clientId: "6d5f17ab-9b5d-44d6-bc42-aa1617498f4d",
            createdAt: "01.01.2023",
            updatedAt: "",
            color: "Красный",
            date: "01.01.2023",
            officer: "64992f14a687ee5e66c557f3",
            description: "",
            resolution: ""
        }

    ]
}

export const casesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_CASE":
            let cases = state.cases
            return {...state, cases }
        case "REMOVE_CASE":
            return {...state, unknownUser: false }
        default:
            return state
    }
}