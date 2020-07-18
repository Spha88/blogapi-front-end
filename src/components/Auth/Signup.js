import React from 'react';

const Signup = () => {
    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex justify-center">
                <form className="md:w-5/12 bg-gray-200 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0" action="">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4" placeholder="First Name" type="text" />
                    <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4" placeholder="Last Name" type="text" />
                    <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4" placeholder="Email" type="email" />
                    <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4" placeholder="Password" type="password" />
                    <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4" placeholder="Confirm Password" type="password" />
                    <button className="text-white bg-teal-800 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Sign Up</button>
                    <p class="text-s text-gray-500 mt-3">Already registered? <a className="hover:text-teal-800" href="/login">Log In</a></p>
                </form>
            </div>
        </section>
    )
}

export default Signup;
