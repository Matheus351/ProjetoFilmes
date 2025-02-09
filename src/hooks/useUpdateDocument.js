import { useState, useEffect, useReducer, act } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error:null
}

const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading:true,error:null}
        case "UPDATED_DOC":
            return {loading:false, error:null}
        case "ERROR":
            return {loading:false, error:action.payload}
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection) => {
    const [response, disptach] = useReducer(updateReducer, initialState)

    const [cancelled, setCancelled] = useState(false)


    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            disptach(action)
        }

    }


    const updateDocument = async (uid, data) => {
        
        checkCancelBeforeDispatch({
            type: "LOADING"
        })
        try {
            
            const docRef = await doc(db, docCollection, uid)

            const updatedDocument = await updateDoc(docRef,data)
            
            
            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload:updatedDocument
            })

        } catch (error) {
            console.log(error)
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload:error.message
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[])



    return { updateDocument, response };


}