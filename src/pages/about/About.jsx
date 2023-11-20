import React from 'react'
import {Link} from 'react-router-dom'
import styles from './About.module.css'
const About = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Página de sobre o miniBlog</h2>
            <p className={styles.par}>Projeto criado com react no frontend e firebase no backend</p>
            <Link to="/newpostage" className={styles.link}>Criar novo post</Link>
        </div>
    )
}

export default About
