import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { extract } from '../../helpers/helpers';
import DeleteModal from '../UI/DeleteModal';
import axios from '../../axios-api';
import { motion } from 'framer-motion';

const Blog = ({ post, fetchPosts }) => {
    const [display, setDisplay] = useState(false)
    let owner;
    // check if the user is logged in and display edit and delete button
    // if this post belongs to the current user
    const user = localStorage.getItem('currentUser'); // return logged in user's id

    // post.author._id - true in UserPage and post.author will be true in posts(home) page
    user && (owner = user === (post.author._id || post.author));
    const toggleDeleteModal = () => setDisplay(!display);
    const deletePost = () => {
        axios.delete(`/blogs/${post._id}`)
            .then(res => {
                toggleDeleteModal();
                fetchPosts();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="p-4 md:w-1/3 sm:mb-0 mb-6" key={post._id}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-lg h-64 overflow-hidden">
                <Link to={`/blog/${post._id}`}>
                    <img alt="content" className="object-cover object-center h-full w-full" src={post.imageUrl} />
                </Link>
            </motion.div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{post.title}</h2>
            <p className="text-base leading-relaxed mt-2">{extract(post.body, 200)}</p>
            <div className="flex mt-3">
                <div className="w-1/3 flex items-center">
                    <Link to={`/blog/${post._id}`}>
                        <span className="text-indigo-500 inline-flex self-center items-center">Read
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </span>
                    </Link>
                </div>
                {owner && (
                    <div className="w-2/3 flex justify-end">
                        {!post.published && <a className="inline-block text-sm text-teal-500 px-4 py-1 leading-none rounded border-teal-800 hover:border-transparent hover:text-white hover:bg-teal-800 mt-4 lg:mt-0" href={`/blog/${post._id}/edit`}>Publish</a>}
                        <a className="inline-block text-sm text-teal-500 px-4 py-1 leading-none rounded border-teal-800 hover:border-transparent hover:text-white hover:bg-teal-800 mt-4 lg:mt-0" href={`/blog/${post._id}/edit`}>Edit</a>
                        <button className="inline-block text-sm text-red-500 px-4 py-1 leading-none rounded border-red-500 hover:border-transparent hover:text-white hover:bg-red-500 mt-4 lg:mt-0" onClick={toggleDeleteModal}>Delete</button>
                    </div>
                )}
            </div>

            <DeleteModal display={display} cancel={toggleDeleteModal} click={deletePost} message="Are you sure you want to delete this post?" />
        </div>
    )
}

export default Blog
