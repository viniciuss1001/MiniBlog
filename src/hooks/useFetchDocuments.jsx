import { useState, useEffect } from "react";
import { db } from "../firebase/Config";
import {
    collection, 
    querry,
    orderBy,
    onSnapshot,
    where,
    doc,
    querySnapshot
} from 'firebase/firestore'


export const useFetchDocuments = (docCollection, search =null, uid= null) => {
    const [documents, setDocuments] = useState(null)

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(null)

    //leak para evitar o vazamento de memória

    const [cancelled, setCancelled] = useState(false)


    useEffect(()=>{
        async function loadData(){
            if(cancelled){
                return
            }

            setLoading(true)

            const collectionRef = await collection(db,  docCollection);

            try {
                let q;

                q = await querry(collectionRef, orderBy("createdAt", "desc"));

                //para trazer o dado renovado toda vez quehouver algum dado alterado
                await onSnapshot(q, (querySnapshot)=>{
                    //o firebase manda muitos dados dos documentos, por isso precisamos fazer um mapeamento e extrair somente o que precisamos
                    setDocuments(
                        querySnapshot.docs.map((document)=>({
                            id: doc.id,
                            
                        }))
                    )
                } )
            } catch (error) {
                
            }

        }
    },[docCollection, search, uid, cancelled])
} 