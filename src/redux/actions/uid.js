export const setUID = (uid) => {
    return {
        type: "SET_UID",
        payload: uid
    }
}

export const unsetUID = () => {
    return {
        type: "UNSET_UID",
    }
}