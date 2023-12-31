import React from 'react';
import styles from './Welcome.module.css';

const Welcome = () => {
    const bgImage = ``;

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: "url(assetimages/home.jpg)",
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