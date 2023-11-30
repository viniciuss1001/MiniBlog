import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import styles from './Post.module.css'
import { useAuthValue } from '../../context/AuthContext'
import { useDeleteDocument } from '../../hooks/useDocumentDelete'
import { Link } from 'react-router-dom'

const Post = () => {
    const {user} = useAuthValue()
    const uid = user.uid

    const { id } = useParams()
    const { document: post, loading } = useFetchDocument("posts", id)



    return (
        <div>
            <h2>local dos detalhes da postagem</h2>
            {loading && <p>Carregando postagem...</p>}
            {post && ( 
                <div className={styles.container}>
                    <h1 className={styles.title} key={post.id}>{post.title}</h1>
                    <p className={styles.body}>{post.body}</p>
                    <img src={post.image} alt={post.id} />
                    {post.tagArray.map((tag)=> (
                        <p key={tag.id} className={styles.tag}>
                            <span>#{tag}</span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Post
