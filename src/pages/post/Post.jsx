import React from 'react'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import styles from './Post.module.css'

const Post = () => {

    const { id } = useParams()

    const { document: post, loading } = useFetchDocument("posts", id)


    return (
        <div>
            {loading && <p>Carregando postagem...</p>}
            {post && ( 
                <div className={styles.container}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.body}>{post.body}</p>
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
