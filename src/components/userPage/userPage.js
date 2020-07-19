import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-api';
import Blog from '../Blog/Blog';

const UserPage = ({ user }) => {

    const [posts, setPosts] = useState()
    const { first_name, last_name, _id } = user;
    useEffect(() => {
        axios.get(`/blogs/user/${_id}`)
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [_id])

    return (
        <div>
            <section className="text-gray-700 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{first_name + ' ' + last_name} </h1>
                        <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">Button</button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Button</button>
                        </div>
                    </div>
                </div>



                {posts ?
                    <div className="container mx-auto">
                        <h2 className="mx-5 mb-5 text-2xl">Articles By {first_name}</h2>

                        <div className="mx-5 mb-20 h-1 bg-gray-200 rounded overflow-hidden">
                            <div className="w-24 h-full bg-indigo-500"></div>
                        </div>

                        <div className="flex px-5 flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                            {posts.map(post => <Blog post={post} key={post._id} />)}
                        </div>
                    </div>
                    : <div className="p-4 md:w-1/1 sm:mb-0 mb-6 self-center">
                        <div style={{ textAlign: 'center' }}>
                            <h1>loading</h1>
                        </div>
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
