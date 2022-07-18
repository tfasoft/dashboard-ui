import { createUser } from "../redux/actions/user";
import { useDispatch } from "react-redux";
import Axios from "axios";
import {useEffect} from "react";

export const useGetUser = (uid) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const send = {
            uid,
        }

        Axios.post('http://localhost:5000/get/admin', send)
            .then((data) => {
                dispatch(createUser(data.data));
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [uid]);
}