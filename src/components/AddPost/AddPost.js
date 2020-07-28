import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import axios from '../../axios-api';

import { connect } from 'react-redux';
import { logout } from '../../store/actions/authentication';

import Editor from '../UI/Editor';

const AddPost = () => {
    const { register, handleSubmit } = useForm();
    const [postBody, setPostBody] = useState();
    let history = useHistory();
    const user = localStorage.getItem('currentUser');

    const handleEditorChange = (content, editor) => {
        setPostBody(content);
    }


    const onSubmit = data => {
        // Redirect if no userId (currentUser) in localStorage
        // This means there is no one logged in
        if (!user) return <Redirect to="/login" />

        //  Add userId as author to the comment data, the comment model in server
        //  requires an author id.
        data = { ...data, body: postBody, author: user }

        axios.post(`/blogs`, { ...data })
            .then((res) => {
                history.push(`/blog/${res.data.post._id}`);
            })
            .catch((err) => {

                //If authorization error remove token from localStorage and ask the user to login
                if (err.response.data === 'Unauthorized') {
                    logout();
                    history.push('/login');
                }
                //If not token error redirect to home page
                history.push(`/`);
            })
    }

    const inputClasses = `w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2`
    return (
        <section className="text-gray-700 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Post</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Add all the details and click on publish if you want your post to be published</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <form className="flex flex-wrap -m-2" onSubmit={handleSubmit(onSubmit)}>

                        <div className="p-2 w-full">
                            <input name="title" placeholder="Post Title" type="text"
                                className={inputClasses}
                                ref={register}
                            />
                        </div>

                        <div className="p-2 w-full">
                            <input name="imageUrl" placeholder="Image URL" type="text"
                                className={inputClasses}
                                ref={register}
                            />
                        </div>

                        <div className="mx-2 w-full mt-5 rounded overflow-hidden border border-gray">
                            <Editor handleChange={handleEditorChange} initialValue="Type your post" />
                        </div>

                        <div className="md:flex md:items-center p-2">
                            <label className="block text-gray-500">
                                <input className="mr-2 leading-tight" type="checkbox" ref={register} name="published" />
                                <span className="">
                                    Publish
                                </span>
                            </label>
                        </div>

                        <div className="p-2 w-full">
                            <button className="flex text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Add Post</button>
                        </div>

                    </form>


                </div>
            </div>
        </section >
    )
}

export default connect(null, { logout })(AddPost)
