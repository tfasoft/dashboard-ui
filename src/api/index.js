import axios from "axios";

import { apiConfig } from "@/config";

const API = axios.create({
  baseURL: apiConfig.endpoint,
});

export default API;
