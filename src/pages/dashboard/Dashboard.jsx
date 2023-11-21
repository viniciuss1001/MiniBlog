import React from 'react'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'



const Dashboard = () => {
    const {user} = useAuthValue()
    const uid = user.uid

    const {documents: posts, loading} = useFetchDocuments("posts", null, uid)

    //para excluir o documento
    const deleteDocument = (id) =>{
        if(loading){
            return <p>Carregando...</p>
        }
    }

    //posts do usuário



    return (
        <div className={styles.container}>
            <h1>DashBoard</h1>
            <p>Gerencie os seus posts</p>

            {posts && posts.length === 0 && (
                <div>
                    <h5>Ainda não há posts para serem exibidos</h5>
                    <Link to="/newpostage" >Criar primeiro post</Link>
                </div>
            )}
            {posts && posts.map((post)=>{
                <>
                    <h3 key={post.key}>{post.title}</h3>
                    <h5>{post.body}</h5>
                    <Link to={`/posts/${post.id}`}>Ver post</Link>
                    <Link to={`/posts/edit/${post.id}`} key={post.id}>Editar post</Link>
                    <button onClick={()=>deleteDocument(post.id)}>Excluir</button>
                </>
            })}
        </div>
    )
}

export default Dashboard
