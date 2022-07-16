export const createUser = (user) => {
    return {
        type: "CREATE_USER",
        payload: user,
    }
}

export const deleteUser = () => {
    return {
        type: "DELETE_USER",
    }
}