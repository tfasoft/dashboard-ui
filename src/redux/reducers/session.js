const sessionReducer = (state = false, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return state = true;
        case "LOGOUT_USER":
            return state = false;
        default:
            return state;
    }
}

export default sessionReducer;