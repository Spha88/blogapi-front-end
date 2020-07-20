import React, { useState, useEffect } from 'react';
import axios from '../../axios-api';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import validator from 'validator';

const UserEditForm = ({ user }) => {
    const [state, setState] = useState({ error: '', message: '' });
    const { register, handleSubmit, errors } = useForm();
    const { first_name, last_name, _id } = user;

    const onSubmit = (data) => {
        console.log(data);
        if (user) {
            axios.put(`/users/${_id}/update`, { ...data }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('myJwt')}` }
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        // fetchPosts();
        // eslint-disable-next-line
    }, [_id, user])

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

                    <input name="imageUrl" placeholder="Profile pic (url)" type="text"
                        className={inputClasses}
                        ref={register}
                    />
                    <p className={errClasses}>{errors.last_name && errors.last_name.message}</p>


                    <textarea name="bio" placeholder="Bio"
                        className={`${inputClasses} resize-none block h-32`}
                        ref={register}
                    ></textarea>
                    <p className={errClasses}>{errors.bio && errors.bio.message}</p>


                    <button className="text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Save</button>
                </form>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(UserEditForm)
