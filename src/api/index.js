import axios from "axios";

import { apiConfig } from "@/config";

const API = axios.create({
  baseURL: apiConfig.endpoint || "http://localhost:5555/api",
});

export default API;
