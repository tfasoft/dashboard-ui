const uidReducer = (state = '', action) => {
    switch (action.type) {
        case "SET_UID":
            return state = action.payload;
        case "UNSET_UID":
            return state = '';
        default:
            return state;
    }
}

export default uidReducer;