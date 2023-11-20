import React from 'react'
import styles from './Create.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAutentication'


const Create = () => {
    //para o registro do usuário
    const [displayName, setDisplayName] = useState("")
    const [email ,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error,setError] = useState("")


    const {createUser, error: authError, loading} = useAuthentication()


    const handleSubmit =async (e) =>{
        e.preventDefault()
        //para zerar o erro
        setError("")

        //formando o usuário
        const user = {
            displayName,
            email,
            password,
            confirmPassword
        }

        if(password !== confirmPassword){
            setError("As senhas não são iguais")
            return
        }


        const res = await createUser(user)

        console.log(user)
        //resetando os valores do input
        setEmail("")
        setDisplayName("")
        setPassword("")
        setConfirmPassword("")
    }

    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    },[authError])


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastre-se e tenha acesso a nossa rede!</h1>
            <p>Crie sua conta e compartilhe suas histórias!</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Email:
                    <input 
                    type="email" 
                    placeholder='Email' 
                    required 
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    Nome:
                    <input 
                    type="text" 
                    placeholder='Seu nome' 
                    required 
                    name='nome' 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    Criar Senha:
                    <input 
                    type="password" 
                    required 
                    placeholder='Criar senha' 
                    name='senha'
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label className={styles.label}>
                    Confirmar Senha:
                    <input 
                    type="password" 
                    required 
                    placeholder='Confirmar senha' name='confirmPassword'  
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {error && <p className="wrongPass">{error}</p>}
                {!loading && <input type="submit" value="Criar conta" className={styles.submit} />}
                {loading && <input type="submit" value="Aguarde..." disabled className={styles.submit} />}
            </form>
        </div>
    )
}

export default Create
