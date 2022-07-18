const envReducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_ENV":
            return state = action.payload;
        default:
            return state;
    }
}

export default envReducer;