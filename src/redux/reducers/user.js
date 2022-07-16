const userReducer = (state = [], action) => {
    switch (action.type) {
        case "CREATE_USER":
            return state.concat(action.payload);
        case "DELETE_USER":
            return state = [];
        default:
            return state;
    }
}

export default userReducer;