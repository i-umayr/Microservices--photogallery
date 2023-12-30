import React from 'react';
import styles from './ImagesHero.module.css';

const ImagesHero = ({storage, bandwidth}) => {
    const formattedStorage = (storage / 1000).toFixed(2);
    const formattedBandwidth = (bandwidth / 1000).toFixed(2);
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Welcome to our Image Gallery</h1>
                <p className={styles.description}>Unlock memories, store freely. Your visual time capsule - where images linger and stories await. Limited storage, unlimited tales. Share the secret with friends.</p>
                <p className={styles.description}>Total Storage: 10kb</p>
                <p className={styles.description}>Remaining Storage: {formattedStorage} kb</p>
                <p className={styles.description}>Total Daily Bandwith: 25kb</p>
                <p className={styles.description}>Remaining Bandwith: {formattedBandwidth} kb</p>
            </div>

            <div className={styles.imageContainer}>
                <img
                    className={styles.image}
                    src={`${process.env.PUBLIC_URL}/images/home.jpg`}
                    alt=''
                />
            </div>
        </div>
    );
};

export default ImagesHero;