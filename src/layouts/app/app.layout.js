import { Container } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setUser } from "@/redux/actions/user";
import API from "@/api";

const AppLayout = ({ children }) => {
  const { token, user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const data = await API.get(`users/${user._id}`);

      dispatch(setUser(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getData();
    }
  }, []);

  return <Container>{children}</Container>;
};

export default AppLayout;
