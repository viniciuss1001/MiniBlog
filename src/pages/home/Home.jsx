import React from 'react'
//css
import styles from './Home.module.css'
//hooks
import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react'

//components


const Home = () => {
    //para a pesquisa
    const [query, setQuery] = useState()
    const [posts] = useState([])



    const handleSubmit = (e) =>{
        e.preventDefault()
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Seja bem-vindo ao miniblog</h2>
            <h4 className={styles.subtitle}>veja abaixo nossos post mais recentes</h4>

            <form onSubmit={handleSubmit} className={styles.formSearch}>
                <input type="text" name="" id="" placeholder='Ou busque por tags...' 
                onChange={(e) => setQuery(e.target.value)}
                className={styles.search}
                />
                <input type="submit" value="Pesquisar"
                className={styles.btn}
                />
            </form>
            <div>
                {/*lista de posts */}

                {posts && posts.length === 0 && (
                    <div className={styles.container}>
                        <h2>Ainda não há postagens para serem exibidas</h2>
                        <Link to="/newpostage" className={styles.btn2}>Criar novo post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
