import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import validator from 'validator';
import { useForm } from 'react-hook-form';

import axios from 'axios';

const Signup = () => {
    const { register, handleSubmit, getValues, errors } = useForm();
    const [state, setState] = useState({ error: false, message: '' })

    let history = useHistory();

    const onSubmit = data => {
        axios.post('/users', { ...data })
            .then(res => {
                history.push('/login')
            })
            .catch(err => {
                setState({
                    error: true,
                    message: 'Could not register, try a different Email or Login'
                })
                console.log('Hello', err);
            })
    };

    const inputClasses = "bg-white rounded border focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-0"
    const errClasses = `text-xs mt-1 mb-4 text-red-800`

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex justify-center">
                <form className="md:w-5/12 bg-gray-200 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit(onSubmit)}>

                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>

                    {state.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{state.message}</span>
                        </div>
                    )}

                    <input name="first_name" placeholder="First Name" type="text"
                        className={inputClasses + (errors.first_name ? " border-red-400" : "border-teal-400")}
                        ref={register({
                            required: 'Enter you first name.',
                            minLength: {
                                value: 3,
                                message:
                                    'Name should not be less than 3 characters',
                            },
                            maxLength: {
                                value: 35,
                                message: 'Maximum number of characters is 35',
                            },
                            validate: value =>
                                validator.isAlpha(value.replace(/\s/g, '')) ||
                                'Invalid name - no numbers and special character allowed',
                        })}
                    />
                    <p className={errClasses}>{errors.first_name && errors.first_name.message}</p>

                    <input name="last_name" placeholder="Last Name" type="text"
                        className={inputClasses + (errors.last_name ? " border-red-400" : "border-teal-400")}
                        ref={register({
                            required: 'Enter your last name.',
                            minLength: {
                                value: 3,
                                message:
                                    'Name should not be less than 3 characters',
                            },
                            maxLength: {
                                value: 35,
                                message: 'Maximum number of characters is 35',
                            },
                            validate: value =>
                                validator.isAlpha(value.replace(/\s/g, '')) ||
                                'Invalid name - no numbers and special character allowed',
                        })}
                    />
                    <p className={errClasses}>{errors.last_name && errors.last_name.message}</p>

                    <input name="username" placeholder="Email" type="email"
                        className={inputClasses + (errors.username ? " border-red-400" : "border-teal-400")}
                        ref={register({
                            required: 'Enter your email.',
                            maxLength: { value: 100, message: 'Email address too long' },
                            validate: value => validator.isEmail(value) || 'Invalid email address',
                        })}
                    />
                    <p className={errClasses}>{errors.username && errors.username.message}</p>

                    <input name="password" placeholder="Password" type="password"
                        className={inputClasses + (errors.password ? " border-red-400" : "border-teal-400")}
                        ref={register({
                            required: 'Enter your password.',
                            minLength: { value: 4, message: "Minimum characters for password is 4" },
                            maxLength: { value: 10, message: "Maximum characters for password is 10" }
                        })}
                    />
                    <p className={errClasses}>{errors.password && errors.password.message}</p>

                    <input name="confirm_password" placeholder="Confirm Password" type="password"
                        className={inputClasses + (errors.confirm_password ? " border-red-400" : "border-teal-400")}
                        ref={register({
                            required: 'Confirm your password.',
                            validate: value => validator.matches(value, getValues('password')) || 'Passwords do not match',
                        })}
                    />
                    <p className={errClasses}>{errors.confirm_password && errors.confirm_password.message}</p>

                    <button className="text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Sign Up</button>
                    <p className="text-s text-gray-500 mt-3">Already registered? <a className="hover:text-teal-800" href="/login">Log In</a></p>
                </form>
            </div>
        </section>
    )
}

export default Signup;
