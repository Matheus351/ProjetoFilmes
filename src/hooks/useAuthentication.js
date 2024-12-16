import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, updteProfile, signout
} from 'firebase/auth'
import { useState, useEffect } from 'react'


export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    const [cancelled, setCancelled] = useState(false)


    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updteProfile(user, {
                displayName:data.displayName
            })

            return user
        } catch (error) {
            console.log(error)
        }   
    }


}