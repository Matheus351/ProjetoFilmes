import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, query, orderBy, onSnapshot, where, setDoc } from "firebase/firestore"


export const useFetchDocuments = (docCollection, search = null) =>{
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    
    const [cancelled, setCancelled] = useState(false)


    // const checkCancelBeforeDispatch = (action) => {
    //     if (!cancelled) {
    //         disptach(action)
    //     }

    // }

    console.log("documents:",documents)

    useEffect(() => {
        async function loadData() {
            if (cancelled) return
            setLoading(true)

            const collectionRef = collection(db, docCollection)

            try {
                let q

                if (search) {
                    q = await query(collectionRef,where("title","==", search),orderBy("createdAt","desc"))
                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }

      
                

                onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                }
                )

                setLoading(false)
            } catch (error) {
                console.log("Erro ao carregar os posts:",error)
                setError(error)
                setLoading(false)
            }
        }
        loadData()
    },[docCollection, search, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    },[])

    return {documents, loading, error}
}