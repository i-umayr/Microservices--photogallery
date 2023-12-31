import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import styles from './HomeCards.module.css'

const image1 = `${process.env.PUBLIC_URL}/images/cardimages/access-from-anywhere.jpg`;
const image2 = `${process.env.PUBLIC_URL}/images/cardimages/file-backups.jpg`;
const image3 = `${process.env.PUBLIC_URL}/images/cardimages/data-privacy-protection.jpg`;

export default function HomeCards() {
    return (
        <div style={{ margin: '2rem', padding: '1rem', color: '#fff' }}>

            <h1 className={styles.homeCardsTitle}>What We Offer</h1>
            
            <CardGroup>
                <Card className={styles.card}>
                    <Card.Img variant="top" src={image1} className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Access files anytime, anywhere</Card.Title>
                        <Card.Text>
                            Instantly access your files from all your computers, mobile devices, and the web. Whether you're working from home, the office, or the most inspiring places on the planet.
                        </Card.Text>
                    </Card.Body>
                </Card >
                <Card className={styles.card}>
                    <Card.Img variant="top" src={image2} className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Keep your work backed up</Card.Title>
                        <Card.Text>
                        We continuously back up your company's documents, ensuring you can restore any file at any time. Recover instantly from ransomware, hardware failure, and human error. Phew!
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className={styles.card}>
                    <Card.Img variant="top" src={image3} className={styles.cardImages}/>
                    <Card.Body>
                        <Card.Title>Secure & Compliant</Card.Title>
                        <Card.Text>
                        Our groundbreaking privacy protection features, enterprise-grade infrastructure, and compliance with widely accepted security and privacy regulations worldwide ensure the safety of your data.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    );
}