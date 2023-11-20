import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAutentication'


const Login = () => {
    const [email ,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")


    const {login, error: authError, loading} = useAuthentication()


    const handleSubmit =async (e) =>{
        e.preventDefault()
        //para zerar o erro
        setError("")

        //formando o usuário
        const user = {
            email,
            password,
        }



        const res = await login(user)

        console.log(user)

    }

    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    },[authError])
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Entrar!</h1>
            <p>Entre em sua conta</p>
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
                    Senha:
                    <input 
                    type="password" 
                    required 
                    placeholder='Senha' 
                    name='senha'
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="wrongPass">{error}</p>}
                {!loading && <input type="submit" value="Entrar" className={styles.submit} />}
                {loading && <input type="submit" value="Aguarde..." disabled className={styles.submit} />}
            </form>
        </div>
    )
}

export default Login
