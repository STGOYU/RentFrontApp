import axios from "axios";
import { services } from "..";
//import { encryptedLocalStorage } from "../encrypt-storage/encrypt-storage";
const API_URL = import.meta.env.VITE_APP_API_URL;

// COMMON ENDPOINTS
export const login = async (payload) => {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
};
export const register = async (payload) => {
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
};

// USER ENDPOINTS
export const getUser = async () => {

    const response = await axios.get(`${API_URL}/user`, services.authHeader());
    return response.data;

    // const response = await axios.get(`${API_URL}/user`, {
    //     {
    //       // Authorization: `Bearer ${encryptedLocalStorage.getItem("pickanddrivetoken")}`
    //     }
    //     return response.data;
    // })
 };
export const updatePassword = () => { };
export const updateUser = () => { };

// ADMIN ENDPOINTS
export const deleteUser = () => { };
export const downloadUserReports = () => { };
export const getUserAdmin = () => { };
export const getUsersByPage = () => { };
export const updateUserAdmin = () => { };