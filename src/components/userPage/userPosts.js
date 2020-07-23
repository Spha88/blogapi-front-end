import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios-api';
import Blog from '../Blog/Blog';
import { logout } from '../../store/actions/authentication';

const UserPosts = ({ user, match, logout }) => {

    const [posts, setPosts] = useState()
    const history = useHistory();

    const fetchPosts = () => {
        axios.get(`/blogs/user/${match.params.id}`)
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                // the token has expired and therefore we need to clear it and login again
                // console.log("We are here")
                if (err.response.data === 'Unauthorized') {
                    logout();
                    console.log('Unauthorized, we redirect now');
                    history.push('/login');
                }

                // if the error is not authorization, redirect to home page
                history.push('/');
            })
    }

    useEffect(() => {
        fetchPosts();

        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <section className="mt-10 text-gray-700 body-font">
                {posts && posts.length ?
                    <div className="container mx-auto">
                        <h2 className="mx-5 mb-5 text-2xl">Posts by {posts[0].author.first_name}</h2>

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

export default connect(mapStateToProps, { logout })(UserPosts);
