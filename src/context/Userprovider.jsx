import React, { useState } from 'react'
import { usercontext } from './Usercontext'

function Userprovider({ children }) {

    //create a new state object for storing the user data 
    const [userData, setUserData] = useState({}) // initialially a blank object 

    const [token,setToken] = useState("") // for storing the jwt token

    //state for storing and updating the current language to be learned and the base language
    const [learningLanguage, setLearningLanguage] = useState("") // initialially a blank string
    const [baseLanguage, setBaseLanguage] = useState("") // initialially a blank string

    //functions to be used in several app components 
    const speak = (text,lang,rate) => {
        console.log(rate);
        const msg = new SpeechSynthesisUtterance()
        msg.rate = rate
        msg.text = text
        msg.lang = lang
        window.speechSynthesis.speak(msg)
    }

    return (
        <usercontext.Provider
            value={{
                userData,
                setUserData,
                learningLanguage,
                setLearningLanguage,
                baseLanguage,
                setBaseLanguage,
                speak,
                token,
                setToken
            }}>
            {children}
        </usercontext.Provider>
    )
}

export default Userprovider
