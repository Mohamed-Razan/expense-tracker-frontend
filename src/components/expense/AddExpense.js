import React, { useEffect, useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { getAllCategories } from '../../services/CategoryService';
import { AddExpenseModel } from '../../model/AddExpenseModel';
import { createExpense, updateExpense } from '../../services/ExpenseService';
import { EditExpenseModel } from '../../model/EditExpenseModel';

function AddExpense({action, dataset}) {

    const [categories, setCategories] = useState([])
    const [description, setDescription] = useState("")
    const [category, setcategory] = useState(null)
    const [categoryId, setcategoryId] = useState(1)
    const [date, setDate] = useState(null)
    const [price, setPrice] = useState(null)

    useEffect(() => {
        getAllCategories()
            .then(response => {
                setCategories(response)
            })
            .catch(error => {
                console.log(error);
            });
            console.log(action);
            if(action === "Update"){
                setDescription(dataset.description)
                setcategory(dataset.category)
                setDate(dataset.expenseDate)
                setPrice(dataset.price)
            }
    }, [dataset])

    const handleRegister = (e) => {

        e.preventDefault();

        if(action === "Add"){
            const model = new AddExpenseModel(description, categoryId, date, price, AuthService.getCurrentUser().id);
            createExpense(model)
            window.location.reload()
        }

        else if(action === "Update"){
            const model = new EditExpenseModel(dataset.id, description, categoryId, date, price, AuthService.getCurrentUser().id);
            updateExpense(model)
            window.location.reload()
        }
        
    }

    return (
        category === {}
            ? <div></div>
            : <div className="col-sm-12">
                <button 
                    className="btn btn-primary btn-block" 
                    style={{width: "300px", display: action === "Add" ? "none" :"block"}}
                    onClick={() => window.location.reload()}
                >
                    Add Expense
                </button>
                <div className="card">
                    <h3>{action} Expense</h3>
                    <Form
                        onSubmit={handleRegister}
                    >
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select 
                                    className="form-control"
                                    name="category"
                                    onChange={(e) => setcategoryId(e.target.value)}
                                >
                                    {categories.map((category, idx) => {
                                        return (
                                            <option key={idx} value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Expense Date</label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">{action === "Add" ?"Add Expense" : "Update Expense"}</button>
                            </div>
                        </div>
                        <CheckButton
                            style={{ display: "none" }}
                        />
                    </Form>
                </div>
            </div>

    )
}

export default AddExpense