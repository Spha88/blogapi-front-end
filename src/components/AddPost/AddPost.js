import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import axios from '../../axios-api';

const AddPost = () => {
    const { register, handleSubmit } = useForm();

    const user = JSON.parse(localStorage.getItem('currentUser'));

    const onSubmit = data => {
        if (!user) return <Redirect to="/login" />
        data = { ...data, author: user._id }
        axios.post(`/blogs`, { ...data })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const inputClasses = `w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2`
    return (
        <section className="text-gray-700 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Post</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
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

                        <div className="p-2 w-full">
                            <textarea name="body" placeholder="Write your post here"
                                className={`${inputClasses} resize-none block h-48`}
                                ref={register}
                            ></textarea>
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

export default AddPost
