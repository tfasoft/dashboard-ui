export const envCreate = (vars) => {
    return {
        type: "CREATE_ENV",
        payload: vars,
    }
}