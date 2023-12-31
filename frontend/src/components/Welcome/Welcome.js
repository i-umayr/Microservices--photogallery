import React from 'react';
import styles from './Welcome.module.css';

const Welcome = () => {
    const bgImage = `${process.env.PUBLIC_URL}/images/home.jpg`;

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
            }}
        >
            <div className={styles.text}>
                <h1>Welcome to our Photo Gallery</h1>
                <p>
                    "A cloud-based solution for all your photo gallery needs"
                </p>
            </div>
        </div>
    );
};

export default Welcome;