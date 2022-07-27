import React, {  useState } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router";
import validator from 'validator'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const history = useHistory();

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("")
        setLoading(true)

        if (!validator.isEmail(username)){
            setMessage("Email is not valid")
            setLoading(false)
        }

        else{
            AuthService.login(username, password).then(
                () => {
                    console.log("razan"); setLoading(false)
                    history.push("/")
                    window.location.reload()
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
    
                        setLoading(false)
                        setMessage("Email or Password is wrong")
                        console.log(resMessage);
                }
            )
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
                    onSubmit={handleLogin}
                >
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
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
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
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

export default Login