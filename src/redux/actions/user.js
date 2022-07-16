const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        payload: user,
    }
}

const logoutUser = () => {
    return {
        type: "LOGOUT_USER",
    }
}

export default {
    loginUser,
    logoutUser
}