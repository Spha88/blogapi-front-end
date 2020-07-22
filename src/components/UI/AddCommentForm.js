import React from 'react';
import { useForm } from 'react-hook-form';
// import validator from 'validator';

const AddCommentForm = ({ addComment }) => {
    const { handleSubmit, register } = useForm();
    const onSubmit = (data, e) => {
        e.target.reset();
        addComment(data);
    }

    const inputClasses = `w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2`
    if (!localStorage.getItem('myJwt')) {
        return (
            <div className="mx-auto mb-10 px-5 pt-5 border-t-2">
                Please log in to add a comment to this post
                <a className="inline-block py-2 px-5 border border-teal-800 rounded hover:bg-teal-800 hover:text-white ml-10" href="/login">Login</a>
            </div>
        )
    }

    return (
        <div className="mx-auto mb-10 pt-5 border-t-2">
            <h2 className="text-2xl font-semibold mb-5 px-5">Add Comment</h2>
            <form className="flex flex-wrap -m-2" onSubmit={handleSubmit(onSubmit)}>

                <div className="p-2 w-full">
                    <textarea name="body" placeholder="Your comment"
                        className={`${inputClasses} resize-none block h-32`}
                        ref={register}
                    ></textarea>
                </div>


                <div className="p-2 w-full">
                    <button className="flex text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Add Comment</button>
                </div>

            </form>
        </div>
    )
}

export default AddCommentForm
