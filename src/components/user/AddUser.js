import React, { useEffect, useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { UserModel } from '../../model/UserModel';
import { createUser } from '../../services/UserService';
import validator from 'validator'

function AddUser({ }) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("admin")

    const handleSubmit = (e) => {

        e.preventDefault();
        if (!validator.isEmail(email)) {
            alert("Email is not valid")
        }

        else if (password.length < 8) {
            alert("Password must be minimum 8 characters")
        }

        else {
            const model = new UserModel(username, email, password, new Array(role))
            createUser(model)
            window.location.reload();
        }

    }

    return (
        <div className="col-sm-12">
            <div className="card">
                <h3>Create User</h3>
                <Form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                name="role"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Add User</button>
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

export default AddUser