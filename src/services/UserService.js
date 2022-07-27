import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080";

export const getAllUsers = async () => {
    try {
        const data = await axios.get(API_URL + '/get-all-users', { headers: authHeader() });
        console.log(data.data);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const createUser = async (data) => {
    axios.post(`${API_URL}/api/auth/signup`, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const makeAdmin = async (userId) => {
    axios.post(`${API_URL}/make-admin/${userId}`, { headers: authHeader() })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-user-by-id/${id}`, { headers: authHeader() });
    }

    catch (error) {
        console.log(error);
    }
}