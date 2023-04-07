export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const unsetUser = () => {
  return {
    type: "UNSET_USER",
  };
};
