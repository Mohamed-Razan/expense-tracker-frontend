import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080";

export const getAllCategories = async () => {
    try {
        const data = await axios.get(API_URL + '/get-all-category', { headers: authHeader() });
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const createCategory = async (data) => {
    axios.post(`${API_URL}/create-category`, data, { headers: authHeader() })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateCategory = async (data) => {
    axios.put(`${API_URL}/update-category`, data, { headers: authHeader() })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-category-by-id/${id}`, { headers: authHeader() });
    }

    catch (error) {
        console.log(error);
    }
}