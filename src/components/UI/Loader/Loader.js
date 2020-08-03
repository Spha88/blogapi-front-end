import React from 'react';
import classes from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={classes.LoaderContainer}>
            <div className={classes.loader}>
                <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
            </div>
        </div>
    )
}

export default Loader
