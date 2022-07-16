export const createUser = (user) => {
    return {
        type: "CREATE_USER",
        payload: user,
    }
}