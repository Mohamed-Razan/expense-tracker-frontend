import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategories } from '../../services/CategoryService';
import AddCategory from './AddCategory';

function Category() {

    const [categories, setCategories] = useState([])
    const [dataset, setDataset] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    const [action, setAction] = useState("Add")

    useEffect(() => {
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
            <div>
                <AddCategory action={action} dataset={dataset} />
                <div>
                    <table className="table table-hover table-dark" style={{ marginTop: '50px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((category, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td><button type="button" className="btn btn-primary" onClick={() => changeToUpdate(category)}>Edit</button></td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => { deleteCategory(category.id); window.location.reload() }}>Delete</button></td>
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

export default Category
