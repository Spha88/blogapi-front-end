import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios-api';
import Blog from '../Blog/Blog';
import { motion } from 'framer-motion';

const UserPage = ({ user }) => {

    const [posts, setPosts] = useState();
    const userId = localStorage.getItem('currentUser');

    const fetchPosts = () => {
        axios.get(`/blogs/user/${userId}`)
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, [])

    // Framer motion variants
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <div>
            <section className="text-gray-700 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <motion.div initial="hidden"
                        duration="2000"
                        animate="visible"
                        variants={variants}
                        className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 overflow-hidden">
                        {user.imageUrl ? <img className="h-full w-full object-cover object-center" alt="hero" src={user.imageUrl} />
                            : <p className="text-center border border-teal-800 px-3 py-5 rounded">click on Edit Profile to add image</p>}
                    </motion.div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{user.first_name + ' ' + user.last_name}</h1>
                        <p className="w-full mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: user.bio }} />
                        <div className="flex justify-center">
                            <Link to="/new">
                                <button className="ml-4 inline-flex text-teals-700 text-sm bg-gray-200 border border-teal-500 py-1 px-6 focus:outline-none hover:bg-teal-800 hover:text-white rounded">Add Post</button>
                            </Link>
                            <Link to="/user/edit">
                                <button className="ml-4 inline-flex text-teals-700 text-sm bg-gray-200 border border-teal-500 py-1 px-6 focus:outline-none hover:bg-teal-800 hover:text-white rounded">Edit Profile</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {posts && posts.length ?
                    <div className="container mx-auto">
                        <h2 className="mx-5 mb-5 text-2xl">Posts by {user.first_name}</h2>

                        <div className="mx-5 mb-20 h-1 bg-gray-200 rounded overflow-hidden">
                            <div className="w-24 h-full bg-indigo-500"></div>
                        </div>

                        <div className="flex px-5 flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                            {posts.map(post => <Blog post={post} key={post._id} fetchPosts={fetchPosts} />)}
                        </div>
                    </div>
                    : <div className="container mx-auto mb-20 text-center">
                        <div className="mx-5 mb-10 h-1 bg-gray-200 rounded overflow-hidden">
                            <div className="w-24 h-full bg-indigo-500"></div>
                        </div>
                        <h2 className="mx-5 mb-3 text-2xl text-center">You have no posts yet</h2>
                        <Link to="/new">
                            <span className="inline-block btn border border-teal-800 px-5 py-1 rounded mt-5 hover:border-transparent hover:bg-teal-500 hover:text-white">Add a post</span>
                        </Link>
                    </div>
                }
            </section>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(UserPage)
