import React from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import styles from './Search.module.css'
import PostDetails from '../../components/PostDetails'
import { Link } from 'react-router-dom'


const Search = () => {

    const query = useQuery()

    const search = query.get("q") //o valor q advém da url de pesquisa que declaramos 
    const { documents: posts} = useFetchDocuments("posts", search)
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Resultado para a busca: </h2>
            <p className={styles.query}>{search}</p>
            <div>
                {posts && posts.length === 0 && (
                    <>
                    <p>Não foram encontrados resultados para sua busca...</p>
                    <Link to="/">Página inicial</Link>
                    </>
                ) }
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search
