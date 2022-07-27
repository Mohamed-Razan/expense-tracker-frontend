import React, { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import { getAllCategories } from '../../services/CategoryService';
import { deleteUser, getAllByUser, getAllUsers, makeAdmin } from '../../services/UserService';
import AddUser from "./AddUser"

function User() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
            .then(response => {
                setUsers(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <AddUser />
            <div>
                <div>
                    <table className="table table-hover table-dark" style={{ marginTop: '50px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Make Admin</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td><button
                                            type="button"
                                            className="btn btn-primary"
                                            disabled={user.roles.find(o => o.name === 'ROLE_ADMIN' ? true : false)}
                                            onClick={() => { makeAdmin(user.id); window.location.reload() }}
                                        >
                                            Make Admin
                                        </button></td>
                                        <td><button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => { deleteUser(user.id); window.location.reload() }}
                                        >
                                            Delete
                                        </button></td>
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

export default User
