import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {
    return (
        <footer>
            <div className={styles.footerContainer}>
                <div className={styles.footerCol}>
                    Mais informações
                </div>
                <div className={styles.footerCol}>
                    Todos os direitos reservados @C 2023
                </div>
                <div className={styles.footerCol}>
                    Sobre a equipe
                </div>
            </div>
        </footer>
    )
}

export default Footer
