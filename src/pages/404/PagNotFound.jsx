import React from 'react'
import styles from './PagNotFound.module.css'
const PagNotFound = () => {
  return (
    <div>
      <h4 className={styles.title}>Página não encontrada</h4>
      <p className={styles.par}>Parece que apágina que você está buscando não exite</p>
    </div>
  )
}

export default PagNotFound
