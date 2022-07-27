import React, { useEffect, useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { AddCategoryModel } from '../../model/AddCategoryModel';
import { EditCategoryModel } from '../../model/EditCategoryModel';
import { createCategory, updateCategory } from '../../services/CategoryService';

function AddCategory({ action, dataset }) {

    const [name, setName] = useState("")

    useEffect(() => {
        if (action === "Update") {
            setName(dataset.name)
        }
    }, [dataset])

    const handleSubmit = (e) => {

        e.preventDefault();

        if(action === "Add"){
            const model = new AddCategoryModel(name);
            createCategory(model)
            window.location.reload()
        }

        else if(action === "Update"){
            const model = new EditCategoryModel(dataset.id, name);
            updateCategory(model)
            window.location.reload()
        }

    }

    return (
        <div className="col-sm-12">
            <button
                className="btn btn-primary btn-block"
                style={{ width: "300px", display: action === "Add" ? "none" : "block" }}
                onClick={() => window.location.reload()}
            >
                Add Category
            </button>
            <div className="card">
                <h3>{action} Category</h3>
                <Form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">{action === "Add" ? "Add Category" : "Update Category"}</button>
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

export default AddCategory