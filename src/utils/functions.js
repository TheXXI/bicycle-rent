export const getStatus = (status) => {
    switch (status) {
        case "new":
            return "Новое"
        case "in_progress":
            return "В процессе"
        default:
            return "Выполнено"
    }
}

export const getType = (type) => {
    if (type === "general") return "Обычный"
    return "Спорт"
}

export const dateFormater = (dateString, time = false) => {
    if (time) return String(dateString).replace("T", " ").slice(0, -8);
    return String(dateString).slice(0, -14);
}

export const getApprovedOfficers = (officers) => {
    return officers.filter(officer => officer.approved === true);
}

export const getOfficerByEmail = (id, officers) => {
    const officer = id && officers ? officers.find(officer => officer._id === id) : null;
    if (officer && officer.email) return officer.email;
    return "Не указан";
}