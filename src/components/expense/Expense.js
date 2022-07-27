import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import { getAllCategories } from '../../services/CategoryService';
import { deleteExpense, getExpensesByUser } from '../../services/ExpenseService';
import AddExpense from './AddExpense';

function Expense() {

    const [expenses, setExpenses] = useState([])
    const [categories, setCategories] = useState([])
    const [dataset, setDataset] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [action, setAction] = useState("Add")

    useEffect(() => {
        getExpensesByUser(authService.getCurrentUser().id)
            .then(response => {
                setExpenses(response)
            })
            .catch(error => {
                console.log(error);
            });
        getAllCategories()
            .then(response => {
                setCategories(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const changeToUpdate = (expense) => {
        setDataset(expense);
        setIsUpdate(true)
        setAction("Update")
    }

    return (
        <div>
            <AddExpense action={action} dataset={dataset} />
            <div>
                <div>
                    <table className="table table-hover table-dark" style={{ marginTop: '50px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses && expenses.map((expense, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{expense.id}</td>
                                        <td>{expense.category.name}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.price}</td>
                                        <td>{expense.expenseDate}</td>
                                        <td><button type="button" className="btn btn-primary" onClick={() => changeToUpdate(expense)}>Edit</button></td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => { deleteExpense(expense.id); window.location.reload() }}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Expense
