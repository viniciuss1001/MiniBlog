import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useAuthentication } from '../hooks/useAutentication'
import { useAuthValue } from '../context/AuthContext'

const Navbar = () => {
    const { user } = useAuthValue();
    const {logout} = useAuthentication()

    return (
        <header className={styles.header}>
            <h3 className={styles.logo}>
                <i className='fa fa-book'></i>
                Mini<span>Blog</span>
            </h3>
            <nav className={styles.nav}>
                <NavLink to="/" className={styles.link} >Início</NavLink>
                <NavLink to="/search" className={styles.link} >Buscar</NavLink>
                {/*condicional para caso o usuário esteja logado */}
                {!user && (
                    <>
                        <NavLink to="/create" className={styles.link} >Criar conta</NavLink>
                        <NavLink to="/login" className={styles.link} >Entrar</NavLink>
                    </>
                )}
                {/*páginas para caso o usuário esteja logado*/}
                {user && (
                    <>
                    <NavLink to="/newpostage" className={styles.link} >Nova postagem</NavLink>
                    <NavLink to="/dashboard" className={styles.link} >Dashboard</NavLink>
                    </>

                )}
                <NavLink to="/about" className={styles.link} >Sobre</NavLink>
                {/*botão para fazer o logout */}
                {user && (
                    <button onClick={logout} className={styles.link}>Sair</button>
                )}
            </nav>

        </header>
    )
}

export default Navbar
