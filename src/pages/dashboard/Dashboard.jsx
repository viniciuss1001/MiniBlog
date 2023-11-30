import React from 'react'
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDocumentDelete'



const Dashboard = () => {
    const { user } = useAuthValue()
    const uid = user.uid

    const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

    //para excluir o documento
    const { deleteDocument } = useDeleteDocument("posts");

    //posts do usuário

    console.log(uid, posts)


    return (
        <div className={styles.container}>
            <h1>DashBoard</h1>
            <p>Gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts</p>
                    <Link to="/posts/create" className="btn">
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                <div className={styles.post_header}>
                    <h3>Veja seus posts abaixo</h3>
                </div>
            )}
            {loading && <p>Carregando...</p>}
            {posts &&
                posts.map((post) => (
                    <div className={styles.postContainer
                    } key={post.id}>
                        <p className={styles.title}>{post.title}</p>
                        <img src={post.image} alt="" className={styles.image}/>
                        <div className={styles.actions}>
                            <Link to={`/posts/${post.id}`} className={styles.btn}>
                                Ver
                            </Link>
                            <Link to={`/post/edit/${post.id}`} className={styles.btn}>
                                Editar
                            </Link>
                            <button
                                onClick={() => deleteDocument(post.id)}
                                className={styles.delete}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Dashboard
