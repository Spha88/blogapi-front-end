import React, { useEffect, useState } from 'react';
import axios from '../../axios-api';
import Blog from './Blog';

const Blogs = (props) => {
    const [posts, setPosts] = useState();
    useEffect(() => {
        axios.get('/blogs')
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col">
                    <div className="h-1 bg-gray-200 rounded overflow-hidden">
                        <div className="w-24 h-full bg-indigo-500"></div>
                    </div>
                    <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                        <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Welcome to the all things football blog</h1>
                        <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">This isn’t your average football blog. Rather than regurgitate rumours like the vast majority of sites, we cover a variety of topics – tactics, player profiles, predictions, match previews, in addition to deconstructing topical issues.</p>
                    </div>
                </div>


                {posts ?
                    <div initial="hidden" animation="visible"
                        className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                        {posts.map(post => <Blog post={post} key={post._id} />)}
                    </div>
                    : <div className="p-4 md:w-1/1 sm:mb-0 mb-6 self-center"><div style={{ textAlign: 'center' }}><h1>loading</h1></div></div>
                }
            </div>
        </section>
    )
}

export default Blogs
