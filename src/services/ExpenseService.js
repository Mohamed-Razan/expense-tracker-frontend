import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080";

export const getExpensesByUser = async (id) => {
    try {
        const data = await axios.get(API_URL + '/get-expense-by-user/' + id, { headers: authHeader() });
        console.log(data.data);
        return data.data;
    }

    catch (error) {
        console.log(error);
    }
}

export const createExpense = async (data) => {
    axios.post(`${API_URL}/create-expense`, data, { headers: authHeader() })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateExpense = async (data) => {
    axios.put(`${API_URL}/update-expense`, data, { headers: authHeader() })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const deleteExpense = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-expense-by-id/${id}`, { headers: authHeader() });
    }

    catch (error) {
        console.log(error);
    }
}