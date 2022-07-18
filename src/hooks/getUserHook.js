import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";

import Axios from "axios";

import { createUser } from "../redux/actions/user";

export const useGetUser = (uid) => {
    const dispatch = useDispatch();

    const env = useSelector(state => state.env);

    useEffect(() => {
        const send = {
            uid,
        }

        Axios.post(`${env.REACT_APP_BACKEND_API}/get/admin`, send)
            .then((data) => {
                dispatch(createUser(data.data));
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [uid]);
}