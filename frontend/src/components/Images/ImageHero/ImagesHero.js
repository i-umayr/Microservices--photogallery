import React from 'react';
import styles from './ImagesHero.module.css';

const ImagesHero = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Welcome to our Image Gallery</h1>
                <p className={styles.description}>Unlock memories, store freely. Your visual time capsule - where images linger and stories await. Limited storage, unlimited tales. Share the secret with friends.</p>
            </div>

            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={`${process.env.PUBLIC_URL}/images/home.jpg`}
                />
            </div>
        </div>
    );
};

export default ImagesHero;