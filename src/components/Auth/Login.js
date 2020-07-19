import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import { connect } from 'react-redux';
import { authenticate } from '../../store/actions/index';

const Login = ({ authenticate, loggedIn, authError }) => {
    const { register, handleSubmit, errors } = useForm();

    const inputClasses = `bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-0`;

    if (loggedIn) return <Redirect to="/" />

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex justify-center">
                <form className="lg:w-5/12 md:w-7/12 sm:w-9/12 bg-gray-200 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0"
                    onSubmit={handleSubmit(authenticate)} >
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>

                    {authError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
                            <span className="block sm:inline">{authError}</span>
                        </div>
                    )}

                    <input className={inputClasses} name="username" placeholder="Email" type="text"
                        ref={register({
                            required: { value: true, message: 'Email required' },
                            maxLength: {
                                value: 100,
                                message: 'Email too long'
                            },
                            validate: value => validator.isEmail(value) || 'Not a valid email',

                        })}
                    />
                    <p className="text-xs mt-1 mb-4 text-red-800">{errors.username && errors.username.message}</p>

                    <input className={inputClasses} name="password" placeholder="password" type="password"
                        ref={register({ required: 'Enter your password' })} />
                    <p className="text-xs mt-1 mb-4 text-red-800">{errors.password && errors.password.message}</p>


                    <button className="text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Login</button>
                    <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </form>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    authError: state.auth.authError
})

export default connect(mapStateToProps, { authenticate })(Login)
