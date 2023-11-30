import styles from "./PostEdit.module.css"

import { useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import {useInsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'




const PostEdit = () => {
    const {id} = useParams()
    const {document: post} = useFetchDocument("posts", id)

    console.log(post)


    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body,setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")


    
    const {user} = useAuthValue()
    
    const {updateDocument, response} = useUpdateDocument("posts")
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(post){
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagArray.join(",")

            setTags(textTags)
        }
    },[post])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError("")

        //validação da url da imagem
        try {
            new URL(image)
        } catch (error) {
            setFormError("Esse não é uma url de uma imagem")
        }

        //criação do array de tags
        const tagArray = tags.split(",").map((tag) => tag.trim().toLowerCase())
        if(formError) return;

        //checar todos os valores
        if(!title || !image || !tags || !body){
            setFormError("Por favor, preencha todos os campos!")
        }

        const data = {
            title,
            image,
            body,
            tagArray,
            uid: user.uid,
            createdBy: user.displayName,
        }

        updateDocument(id, data)

        //redirecionamento para a home após a criação do post
        navigate("/")
    }
    return (
        <div className={styles.container}>
            <h2>Edição das postagem</h2>
            <p>Edite e melhore sua postagem!</p>
            
            {post && (
                <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    <span>Você está editando o post:  {post.title}</span>
                    <input type="text" name="Title" id="" placeholder='Título da publicação' required onChange={(e) =>setTitle(e.target.value)} 
                    value={title}/>
                </label>
                <label>
                    <span>Imagem</span>
                    <input type="text" name="img" id="" placeholder='URL da imagem' 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <p>preview da imagem do Post
                    <img src={post.image} alt={post.id} />
                </p>
                <label>
                    <span>Corpo</span>
                    <textarea type="text" name="body" id="" placeholder='Conteúdo da Publicação ' required 
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    />
                </label>
                <label>
                    <span>Tags da publicação</span>
                    <input type="text" name="tags" id="" placeholder='Tags da publicação' required 
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                    />
                </label>
                {!response.loading && <input type="submit" value="Editar" className={styles.send}  />}
                {response.loading && <input type="submit" value="Aguarde..." disabled className={styles.send} />}
                {response.error && <p>{response.error}</p>}
                {formError.error && <p>{response.error}</p>}
            </form>
            )}
        </div>
    )
}

export default PostEdit
