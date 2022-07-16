const userReducer = (state = [], action) => {
    switch (action.type) {
        case "CREATE_USER":
            return state.concat(action.payload);
        default:
            return state;
    }
}

export default userReducer;