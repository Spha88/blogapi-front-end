import React, { useState, useEffect } from 'react';
import axios from '../../axios-api';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { updateUser } from '../../store/actions/authentication';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/actions/authentication';
import Editor from '../UI/Editor';

const UserEditForm = ({ user, updateUser }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [userBio, setUserBio] = useState('');
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm();
    const userId = localStorage.getItem('currentUser');

    const handleEditorChange = (content, editor) => {
        setUserBio(content);
    }

    const onSubmit = data => {
        axios.put(`/users/${userId}/update`, { ...data, bio: userBio })
            .then((res) => {
                setUserProfile(res.data.user);
                updateUser(res.data.user);
                setUpdated(true);
            })
            .catch((err) => {
                if (err.response.data === 'Unauthorized') {
                    logout();
                    history.push('/login');
                }
                history.push('/user');
            })
    }

    useEffect(() => {
        // Fetch user data to populate the form
        axios.get(`/users/${userId}`)
            .then((res) => {
                setUserBio(res.data.user.bio);
                setUserProfile(res.data.user);
            })
            .catch((err) => {
                if (err.response.data === 'Unauthorized') {
                    logout();
                    history.push('/login');
                }
                history.push('/user');
            })
        // eslint-disable-next-line
    }, [userId])

    const inputClasses = "bg-white rounded border focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-0"
    const errClasses = `text-xs mt-1 mb-4 text-red-800`

    return (

        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex justify-center">
                {!updated ? (
                    <form className="md:w-5/12 bg-gray-200 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0" onSubmit={handleSubmit(onSubmit)}>

                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>

                        <input name="first_name" placeholder="First Name" type="text"
                            className={inputClasses + (errors.first_name ? " border-red-400" : "border-teal-400")}
                            defaultValue={userProfile ? userProfile.first_name : ''}
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
                            defaultValue={userProfile ? userProfile.last_name : ''}
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
                            defaultValue={userProfile ? userProfile.username : ''}
                            ref={register({
                                required: 'Enter your email.',
                                maxLength: { value: 100, message: 'Email address too long' },
                                validate: value => validator.isEmail(value) || 'Invalid email address',
                            })}
                        />
                        <p className={errClasses}>{errors.username && errors.username.message}</p>

                        <input name="imageUrl" placeholder="Profile pic (url)" type="text"
                            defaultValue={userProfile ? userProfile.imageUrl : ''}
                            className={inputClasses}
                            ref={register}
                        />
                        <p className={errClasses}>{errors.last_name && errors.last_name.message}</p>

                        {userProfile && <Editor handleChange={handleEditorChange} initialValue={userProfile.bio} />}


                        <button className="text-white bg-teal-800 border-0 mt-5 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Save</button>
                    </form>
                ) : (
                        <div className="w-full md:w-1/2 bg-blue-100 border rounded p-10 border-teal-800 text-blue-700 text-center" role="alert">
                            <p className="font-bold ">Profile Updated</p>
                            <p className="text-sm mt-10"><a href="/user" className="inline-block py-1 px-5 border rounded">View Profile</a></p>
                        </div>
                    )}

            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { updateUser })(UserEditForm)
