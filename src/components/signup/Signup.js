import React, { useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router";
import validator from 'validator'

function Signup() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory();

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("")
        setSuccessful(false)

        if (!validator.isEmail(email)) {
            setMessage("Email is not valid")
            setSuccessful(false)
        }

        else if (password.length < 8) {
            setMessage("Password must be minimum 8 characters")
            setSuccessful(false)
        }

        else {
            AuthService.register(
                username,
                email,
                password
            ).then(
                response => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                },
                setTimeout(() => {
                    history.push("/login");
                }, 5000),
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setSuccessful(true)
                    setMessage(resMessage)
                }
            );
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleRegister}
                >
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
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
                                    onChange={onChangeEmail}
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
                                    onChange={onChangePassword}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                    />
                </Form>
            </div>
        </div>
    )
}

export default Signup