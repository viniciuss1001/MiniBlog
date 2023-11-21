import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PostDetails.module.css'



const PostDetails = ({post}) => {
    return (
        <div className={styles.container}>
            <img src={post.image} />
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.user}>{post.createdBy}</p>
            <p>{post.body}</p>
            <div>
                {post.tagArray.map((tag) => (
                    <p key={tag} className={styles.tagcontainer}>
                        <span className={styles.tag}>#{tag}</span>
                    </p>
                ))}
            </div>
                <Link to={`/posts/${post.id}`}>Leia</Link>
        </div>
    )
}

export default PostDetails
