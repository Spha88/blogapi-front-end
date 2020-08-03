import React, { useEffect, useState } from 'react';
import axios from '../../axios-api';
import Blog from './Blog';

const Blogs = (props) => {
    const [posts, setPosts] = useState();
    const [error, setError] = useState(false);
    const getBlogs = () => {
        axios.get('/blogs')
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                // console.log(err)
                setError(true);
            })
    }
    useEffect(() => {
        getBlogs();
        return () => {
            setError(false);
        }
    }, [])

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col">
                    <div className="h-1 bg-gray-200 rounded overflow-hidden">
                        <div className="w-24 h-full bg-indigo-500"></div>
                    </div>
                    <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                        <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">My Journey form Newbie to FullStack Developer</h1>
                        <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">This Blog is part of a solution to an assignment from The Odin Project to practice and see the benefits of creating an API only backend. <strong>BAPI</strong> = Blog API</p>
                    </div>
                </div>


                {posts ?
                    <div initial="hidden" animation="visible"
                        className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                        {posts.map(post => <Blog post={post} key={post._id} fetchPosts={getBlogs} />)}
                    </div>
                    : error ?
                        (<div className="p-4 md:w-1/1 sm:mb-0 mb-6 self-center">
                            <div className="xl:w-1/2 sm:w-full text-center border border-red-800 rounded p-5  mx-auto text-bold text-red-500 font-bold">
                                <h1>Error Loading Posts</h1>
                            </div>
                        </div>)
                        :
                        (<div className="p-4 md:w-1/1 sm:mb-0 mb-6 self-center">
                            <div className="text-center">
                                <h1>Loading</h1>
                            </div>
                        </div>)
                }
            </div>
        </section>
    )
}

export default Blogs
