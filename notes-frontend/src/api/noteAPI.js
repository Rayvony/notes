import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables.js";
const { VITE_API_URL } = getEnvVariables();

export const noteAPI = axios.create({
  baseURL: VITE_API_URL,
});
