const userReducer = (state = [], action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return state.concat(action.payload);
        case "LOGOUT_USER":
            return state = [];
        default:
            return null;
    }
}

export default userReducer;