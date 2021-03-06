import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authentication';

const Nav = ({ loggedIn, logout, user }) => {

    const [currentUser, setCurrentUser] = useState();
    const [openNav, setOpenNav] = useState(true);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    return (
        <header className="bg-teal-800">
            <nav className="container mx-auto flex items-center justify-between flex-wrap p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-2xl tracking-tight">BAPI</span>
                </div>
                <div className="flex lg:hidden">
                    {!loggedIn ? (
                        <div className="">
                            <Link to="/login">
                                <span className="inline-block text-sm px-4 py-2 mr-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">Log In</span>
                            </Link>
                            {' '}
                            <Link to="/signup">
                                <span className="text-green-200">Register</span>
                            </Link>
                        </div>
                    ) : (
                            <div className="">
                                <Link to={`/user`}>
                                    <span className="text-white mr-5">{currentUser && currentUser.first_name}</span>
                                </Link>
                                <Link to="/">
                                    <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-500 border-red-500 hover:border-transparent hover:text-white hover:bg-red-500 lg:mt-0" onClick={() => logout()}>Logout</span>
                                </Link>
                            </div>
                        )}
                    <button onClick={() => setOpenNav(!openNav)} className="flex items-center px-3 py-0 ml-3 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>
                <div className={`${!openNav ? 'hidden' : 'w-full block flex-grow lg:flex lg:items-center lg:w-auto'}`}>
                    <div className="text-sm lg:flex-grow">
                        <Link to="/">
                            <span className="block mt-4 mr-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                                Blog
                            </span>
                        </Link>
                        {loggedIn && (
                            <Link to="/new">
                                <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                                    Add Post
                                </span>
                            </Link>
                        )}
                    </div>

                    {!loggedIn ? (
                        <div className="hidden lg:inline-block">
                            <Link to="/login">
                                <span className="inline-block text-sm px-4 py-2 mr-5 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Log In</span>
                            </Link>
                            {' '}
                            <Link to="/signup">
                                <span className="text-green-200">Register</span>
                            </Link>
                        </div>
                    ) : (
                            <div className="hidden lg:inline-block">
                                <Link to={`/user`}>
                                    <span className="text-white mr-5">{currentUser && currentUser.first_name}</span>
                                </Link>
                                <Link to="/">
                                    <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-500 border-red-500 hover:border-transparent hover:text-white hover:bg-red-500 mt-4 lg:mt-0" onClick={() => logout()}>Logout</span>
                                </Link>
                            </div>
                        )}

                </div>
            </nav>
        </header >
    )
}
const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
})

export default connect(mapStateToProps, { logout })(Nav)
