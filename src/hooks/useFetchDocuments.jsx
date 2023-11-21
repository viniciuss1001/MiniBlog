
import { useState, useEffect } from 'react';
import { db } from '../firebase/Config';
import { collection, query, onSnapshot, where, orderBy, getDocs } from 'firebase/firestore'

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        const getUsers = async () => {

            if (cancelled) return

            setLoading(true);

            const userCollectionRef = collection(db, docCollection);

            try {
                let q;

                if (search) {
                    q = await query(userCollectionRef,  where("tagArray", 'array-contains', search), orderBy("createdAt", "desc")
                    )
                }else if(uid){
                    q = await query(userCollectionRef,  where("uid", "==", uid), orderBy("createdAt", "desc")
                    )
                }
                else {
                    
                }

                q = await getDocs(userCollectionRef);
                setDocuments(q.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })))
                //console.log(documents)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false)
            }

        }
        getUsers();
    }, [docCollection, search, uid, cancelled])

    return { documents, loading, error };
}