import React from 'react'

const DeleteModal = ({ message, display, click, cancel }) => {
    const modalClasses = `z-10 fixed inset-0 p-1  bg-gray-500 bg-opacity-50 items-center justify-center`
    return (
        <div className={`${modalClasses} ${display ? 'flex' : 'hidden'}`}>
            <div className="lg:w-5/12 md:w-7/12 sm:w-12/12 shadow-2xl border border-red-500 rounded mx-auto p-10 bg-white text-center">
                <p className="text-l">Are you sure you want to delete this post?</p>
                <div>
                    <button onClick={cancel} className="btn border border-teal-500 text-teal-500 px-4 py-1 mt-5 mr-5 rounded hover:border-transparent hover:bg-teal-500 hover:text-white">Cancel</button>
                    <button onClick={click} className="btn border border-red-500 text-red-500 px-4 py-1 mt-5 rounded hover:border-transparent hover:bg-red-500 hover:text-white ">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
