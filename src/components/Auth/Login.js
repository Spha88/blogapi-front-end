import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [state, setState] = useState({ error: false, message: '' })
    let history = useHistory();

    const onSubmit = data => {
        axios.post('http://localhost:3000/auth/login', { ...data })
            .then(res => {
                console.log(res);
                setState({ error: false, message: '' })
                localStorage.setItem('myJwt', res.data.token);
                history.push('/');
            })
            .catch(err => {
                setState({
                    error: true,
                    message: 'Could not login Email or Password in correct'
                })
                console.log('ERROR IN THE BUILDING', err);
            })
    };

    const inputClasses = `bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4`;
    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex justify-center">
                <form className="md:w-5/12 bg-gray-200 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>

                    {state.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{state.message}</span>
                        </div>
                    )}

                    <input className={inputClasses} ref={register} name="username" placeholder="Email" type="text" />
                    <input className={inputClasses} ref={register} name="password" placeholder="password" type="password" />
                    <button className="text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Login</button>
                    <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </form>
            </div>
        </section>
    )
}

export default Login
