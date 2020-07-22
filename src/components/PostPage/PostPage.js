import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios-api';
import moment from 'moment';
import AddCommentForm from '../UI/AddCommentForm';
import { extract } from '../../helpers/helpers';


const PostPage = (props) => {
    const [post, setPost] = useState(null);
    const userId = JSON.parse(localStorage.getItem('currentUser'));
    const fetchPost = () => {
        axios.get(`/blogs/${props.match.params.id}`)
            .then(res => {
                setPost(res.data.post)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const addComment = comment => {
        axios.post(`/blogs/${props.match.params.id}/comment`, { ...comment, author: userId })
            .then(res => {
                console.log(res.data);
                fetchPost();
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchPost()
        // eslint-disable-next-line
    }, [])

    console.log(post);

    return (
        <section className="text-gray-700 body-font">
            {post ? (
                <div className="container px-5 py-24 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <img alt="content" className="object-cover object-center h-full w-full" src={decodeURI(post.details.imageUrl)} />
                        </div>
                        <div className="flex flex-col sm:flex-row mt-10">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="w-20 h-20 overflow-hidden rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    {post.details.author.imageUrl && <img src={post.details.author.imageUrl} className="object-cover h-full w-full object-center" alt="author" />}
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                                        <a href={`/user/${post.details.author._id}`}>{`${post.details.author.first_name} ${post.details.author.last_name}`}</a>
                                    </h2>
                                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                    <p className="text-base text-gray-600">{post.details.author.bio && extract(post.details.author.bio, 100)}</p>
                                </div>
                            </div>

                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-300 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">

                                <h1 className="text-2xl font-semibold pb-4">{post.details.title}</h1>

                                <p className="leading-relaxed text-lg mb-4">
                                    {post.details.body}
                                </p>

                                <div>{moment(post.details.date).format('ddd DD MMMM, YYYY')}</div>
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold mt-20 px-5">Comments</h1>

                        <div className="container px-5 py-10 mx-auto">
                            <div className="-my-8">
                                {post.comments.length ? post.comments.map((comment, index) => (

                                    <div className={`py-8 flex flex-wrap md:flex-no-wrap ${index > 0 ? 'border-t-2' : ''}`} key={comment._id}>
                                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                            <a href={`/user/${comment.author._id}`}>
                                                <span className="tracking-widest font-medium title-font text-gray-900">{comment.author.first_name + ' ' + comment.author.last_name}</span>
                                            </a>
                                            <span className="mt-1 text-gray-500 text-sm">{moment(comment.date).format('HH:MM ddd DD MMMM, YYYY')}</span>
                                        </div>
                                        <div className="md:flex-grow">
                                            <p className="leading-relaxed">{comment.body}</p>
                                        </div>

                                    </div>

                                )) : (
                                        <div>
                                            <h3>No comments on this post</h3>
                                        </div>
                                    )}
                            </div>
                        </div>

                        <AddCommentForm addComment={addComment} user={post.details.author} />

                        <footer className="flex justify-center border-t-2 pt-10">
                            <Link to="/">
                                <span className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                    Back
                                </span>
                            </Link>
                        </footer>

                    </div>

                </div>
            ) : (
                    <div>
                        <div>
                            <h2>Loading</h2>
                        </div>
                    </div>
                )
            }

        </section >
    )
}

export default PostPage;
