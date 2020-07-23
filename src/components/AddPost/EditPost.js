import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import axios from '../../axios-api';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authentication';

const EditPost = ({ match, logout }) => {
    const { register, handleSubmit } = useForm();
    const [post, setPost] = useState('')
    let history = useHistory();

    const userId = localStorage.getItem('currentUser');
    const postId = match.params.id;

    const onSubmit = data => {
        // send data to server;
        data = { ...data, author: userId }
        axios.put(`/blogs/${postId}`, { ...data })
            .then((res) => {
                history.push(`/blog/${match.params.id}`);
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
        // Get post to fill the form with the
        axios.get(`/blogs/${match.params.id}/edit`)
            .then(res => {
                setPost(res.data.post);
            })
            .catch(err => {
                if (err.response.data === 'Unauthorized') {
                    logout();
                    history.push('/login');
                }
                history.push('/');
            })
        // eslint-disable-next-line
    }, [match.params.id])

    // Redirect if there is no user logged in
    if (!userId) return <Redirect to="/login" />

    const inputClasses = `w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2`
    return (
        <section className="text-gray-700 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Edit Post</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Add all the details and click on publish if you want your post to be published</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <form className="flex flex-wrap -m-2" onSubmit={handleSubmit(onSubmit)}>

                        <div className="p-2 w-full">
                            <input name="title" placeholder="Post Title" type="text"
                                defaultValue={post.title}
                                className={inputClasses}
                                ref={register}
                            />
                        </div>

                        <div className="p-2 w-full">
                            <input name="imageUrl" placeholder="Image URL" type="text"
                                defaultValue={post.imageUrl}
                                className={inputClasses}
                                ref={register}
                            />
                        </div>

                        <div className="p-2 w-full">
                            <textarea name="body" placeholder="Write your post here"
                                defaultValue={post.body}
                                className={`${inputClasses} resize-none block h-48`}
                                ref={register}
                            ></textarea>
                        </div>

                        <div className="md:flex md:items-center p-2">
                            <label className="block text-gray-500">
                                <input className="mr-2 leading-tight" type="checkbox" defaultChecked={post.published} ref={register} name="published" />
                                <span className="">
                                    Publish
                                </span>
                            </label>
                        </div>

                        <div className="p-2 w-full">
                            <button className="flex text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Save Post</button>
                        </div>

                    </form>
                </div>
            </div>
        </section >
    )
}

export default connect(null, { logout })(EditPost);
