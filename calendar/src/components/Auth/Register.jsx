import React, { useEffect } from 'react'
import style from "./Auth.module.scss"
import { useForm } from "react-hook-form"
import { data, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/AuthReducer';

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const { loading, error, token } = useSelector((state) => state.auth);
    let dispatch = useDispatch()

    let navigate = useNavigate()
    useEffect(()=>{
        if(error){
            alert(error)
        }
        if(token){
            navigate("/")
        }
    }, [token, error])

    return (
        <div className={style.wrapper}>
            <form onSubmit={handleSubmit((data) => dispatch(registerUser(data)))}>
                <h1>Register</h1>
                <label htmlFor="login">Login</label>
                <input type="text" id='login' {
                    ...register(
                        "login",
                        {
                            required: {
                                value: true,
                                message: "Login is required!"
                            },
                            minLength: {
                                value: 3,
                                message: "min length 3 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Too many characters"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Only characters and numbers are available"
                            }
                        }
                    )
                } />
                <span>{errors.login?.message}</span>
                <br />

                <label htmlFor="email">Email</label>
                <input type="text" id='email' {
                    ...register("email", {
                        required: true,
                        pattern: {
                            value: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/,
                            message: "Invalid email format"
                        }
                    })
                } />
                <span>{errors.email?.message}</span>
                <br />

                <label htmlFor="password">Password</label>
                <input type="text" id='password' {
                    ...register(
                        "password",
                        {
                            required: {
                                value: true,
                                message: "Password is required!"
                            },
                            minLength: {
                                value: 6,
                                message: "min length 6 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Too many characters"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Only characters and numbers are available"
                            }
                        }
                    )
                } />
                <span>{errors.password?.message}</span>
                <br />

                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="text" id='confirmPassword' {
                    ...register("confirmPassword", {
                        required: true,
                        validate: (value) => {
                            if (value !== watch("password")) {
                                return "Passwords do not match"
                            }
                        }
                    })
                } />
                <span>{errors.confirmPassword?.message}</span>
                <br />

                <button className={style.button}>Register</button>
            </form>
        </div>
    )
}
